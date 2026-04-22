import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { ClaySwitch } from '@/components/ui/ClaySwitch';
import { ClayTimePicker } from '@/components/ui/ClayTimePicker';
import { useBottomModalStore } from '@/store/useBottomModalStore';
import { useAppStore } from '@/store/useAppStore';
import { TAG_COLORS } from '@/constants/theme';
import { Task } from '@/types';
import { useMutation } from '@apollo/client/react';
import { MARK_TASK_COMPLETE, UPDATE_TASK } from '@/graphql/mutations/task';
import { Lock, Unlock } from 'lucide-react-native';

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();

  const idStr = Array.isArray(taskId) ? taskId[0] : taskId;
  const task = useAppStore((state) => state.tasks.find((t) => t.id === idStr));

  const { openModal, closeModal } = useBottomModalStore();

  // Local states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Task>>(task || {});
  const [errorToast, setErrorToast] = useState('');

  // Apollo Mutations
  const [markComplete, { loading: isCompleting }] =
    useMutation(MARK_TASK_COMPLETE);
  const [updateTask, { loading: isUpdating }] = useMutation(UPDATE_TASK);

  if (!task) {
    return (
      <SafeAreaView className="flex-1 bg-background pt-8 items-center justify-center">
        <Text className="text-xl text-muted-foreground font-bold">
          Task not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 px-6 py-3 bg-primary rounded-full"
        >
          <Text className="text-primary-foreground font-bold text-lg">
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const colors = TAG_COLORS[task.tag];
  const isLoading = isCompleting || isUpdating;

  const handleMarkComplete = async () => {
    setErrorToast('');
    try {
      await markComplete({
        variables: { id: task.id },
        refetchQueries: ['GetTasks'], // Pessimistic update relies on refetch
      });
      router.back();
    } catch (err) {
      setErrorToast('Failed to complete task. Please try again.');
    }
  };

  const handleUpdate = async () => {
    setErrorToast('');
    try {
      await updateTask({
        variables: { id: task.id, input: { ...editData, id: undefined } },
        refetchQueries: ['GetTasks'], // Pessimistic update
      });
      setIsEditing(false);
    } catch (err) {
      setErrorToast('Failed to update task. Please try again.');
    }
  };

  const renderEditForm = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ClayCard className="p-6">
        <Text className="text-xl font-bold mb-4">Edit Task</Text>
        <TextInput
          className="border border-border rounded-xl p-3 mb-4 text-base bg-secondary"
          value={editData.task_name}
          onChangeText={(text) => setEditData({ ...editData, task_name: text })}
          placeholder="Task Name"
        />
        <View className="flex-row gap-4 mb-4">
          <TouchableOpacity
            className="flex-1 border border-border rounded-xl p-4 bg-secondary flex-row items-center"
            activeOpacity={0.7}
            onPress={() => {
              openModal(
                <ClayTimePicker
                  title="Select Start Time"
                  initialValue={editData.start_time ?? '08:00'}
                  onCancel={closeModal}
                  onConfirm={(time) => {
                    setEditData({ ...editData, start_time: time });
                    closeModal();
                  }}
                />,
              );
            }}
          >
            <Text className="text-base flex-1 text-foreground">
              Start: {editData.start_time || 'HH:mm'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 border border-border rounded-xl p-4 bg-secondary flex-row items-center"
            activeOpacity={0.7}
            onPress={() => {
              openModal(
                <ClayTimePicker
                  title="Select End Time"
                  initialValue={editData.end_time ?? '09:00'}
                  onCancel={closeModal}
                  onConfirm={(time) => {
                    setEditData({ ...editData, end_time: time });
                    closeModal();
                  }}
                />,
              );
            }}
          >
            <Text className="text-base flex-1 text-foreground">
              End: {editData.end_time || 'HH:mm'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1 gap-y-1">
            <View className="flex-row items-center">
              {editData.isLocked ? (
                <Lock size={20} color="#1C1C1E" />
              ) : (
                <Unlock size={20} color="#8E8E93" />
              )}
              <Text className="text-base font-bold text-foreground ml-2 flex-1">
                Smart Adjust Lock
              </Text>
              <ClaySwitch
                value={Boolean(editData.isLocked)}
                onValueChange={(val: boolean) =>
                  setEditData({ ...editData, isLocked: val })
                }
              />
            </View>
            <Text className="text-xs text-muted-foreground italic">
              Lock time slot. AI will not reschedule this critical event
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <ClayButton
              label="Cancel"
              variant="outline"
              onPress={() => setIsEditing(false)}
            />
          </View>
          <View className="flex-1">
            <ClayButton
              label={isUpdating ? 'Saving...' : 'Save'}
              variant="primary"
              onPress={handleUpdate}
              disabled={isLoading}
            />
          </View>
        </View>
      </ClayCard>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView className="flex-1 bg-background pt-8 relative">
      <View className="flex-row items-center px-4 mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          disabled={isLoading}
          className="px-2 py-2"
        >
          <Text
            className={`font-medium text-lg ${isLoading ? 'text-muted-foreground' : 'text-primary'}`}
          >
            ← Back
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className={`flex-1 p-4 ${isLoading ? 'opacity-50' : ''}`}>
        {isEditing ? (
          renderEditForm()
        ) : (
          <ClayCard className="p-6 min-h-[300px]">
            <View className="flex-row justify-between items-start mb-6">
              <View className={`px-4 py-1.5 rounded-full ${colors.bg}`}>
                <Text className={`text-sm font-bold ${colors.text}`}>
                  {task.tag}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm font-bold text-muted-foreground pt-1">
                  {task.start_time} - {task.end_time}
                </Text>
                {task.isLocked && (
                  <Text className="text-xs text-primary font-bold mt-1">
                    Locked (Fixed)
                  </Text>
                )}
              </View>
            </View>

            <Text className="text-3xl font-bold text-foreground mb-4 leading-tight">
              {task.task_name}
            </Text>
            <Text className="text-lg text-muted-foreground leading-relaxed mb-8">
              Duration: {Math.round(task.duration_minutes / 60)}h{' '}
              {task.duration_minutes % 60
                ? `${task.duration_minutes % 60}m`
                : ''}
            </Text>

            <View className="mt-auto space-y-4 gap-y-4">
              {isCompleting ? (
                <View className="py-4 items-center justify-center bg-primary rounded-[1.5rem] flex-row gap-2">
                  <ActivityIndicator color="white" />
                  <Text className="text-primary-foreground font-bold">
                    Completing...
                  </Text>
                </View>
              ) : (
                <ClayButton
                  label="Mark as Complete"
                  variant="primary"
                  onPress={handleMarkComplete}
                  disabled={isLoading}
                />
              )}
              <ClayButton
                label="Edit Task"
                variant="outline"
                onPress={() => setIsEditing(true)}
                disabled={isLoading}
              />
            </View>
          </ClayCard>
        )}
      </ScrollView>

      {/* Error Toast */}
      {errorToast ? (
        <View className="absolute bottom-10 left-4 right-4 bg-destructive rounded-xl p-4 shadow-xl flex-row items-center">
          <Text className="text-destructive-foreground font-bold flex-1">
            {errorToast}
          </Text>
          <TouchableOpacity onPress={() => setErrorToast('')}>
            <Text className="text-destructive-foreground font-bold text-lg">
              ×
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Loading Overlay */}
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View className="bg-card p-6 rounded-2xl shadow-clay flex-row items-center gap-4">
            <ActivityIndicator size="large" color="hsl(22, 58%, 50%)" />
            <Text className="text-foreground font-bold text-lg">
              Syncing...
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
