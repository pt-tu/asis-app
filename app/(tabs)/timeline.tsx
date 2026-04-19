import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';
import { TaskTag } from '@/types';
import { TAG_COLORS } from '@/constants/theme';
import { TaskCard } from '@/components/timeline/TaskCard';
import { WeekView } from '@/components/timeline/WeekView';
import { MonthView } from '@/components/timeline/MonthView';
import { ClayButton } from '@/components/ui/ClayButton';
import { Plus } from 'lucide-react-native';
import { useMutation } from '@apollo/client/react';
import { CREATE_TASK_MUTATION } from '@/graphql/mutations/task';

type ViewMode = 'Today' | 'Week' | 'Month';

export default function TimelineScreen() {
  const tasks = useAppStore((state) => state.tasks);
  const [viewMode, setViewMode] = useState<ViewMode>('Today');

  // Manual Task creation states
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tag, setTag] = useState<TaskTag>('Work');
  const [errorToast, setErrorToast] = useState('');

  const [createTask, { loading: isCreating }] =
    useMutation(CREATE_TASK_MUTATION);

  const handleCreateTask = async () => {
    if (!taskName || !startTime || !endTime) {
      setErrorToast('Please fill all required fields');
      return;
    }
    setErrorToast('');
    try {
      await createTask({
        variables: {
          input: {
            task_name: taskName,
            start_time: startTime,
            end_time: endTime,
            duration_minutes: 60, // Basic mock
            tag,
          },
        },
        refetchQueries: ['GetTasks'], // Pessimistic Refetch
      });
      // Close and reset form on success
      setModalVisible(false);
      setTaskName('');
      setStartTime('');
      setEndTime('');
    } catch (e) {
      setErrorToast('Failed to create task. Please try again.');
    }
  };

  const renderToday = () => (
    <View className="space-y-4">
      {tasks.map((task, idx) => (
        <TaskCard key={task.id} task={task} index={idx} prefix="today" />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background pt-10 relative">
      <View className="px-4 mb-6 flex-row justify-between items-end">
        <View className="flex-1">
          <Text className="text-4xl font-bold text-foreground mb-4 px-2">
            Schedule
          </Text>
          <View className="flex-row p-1.5 rounded-full items-center shadow-clay-inset mx-1">
            {['Today', 'Week', 'Month'].map((mode) => {
              const isActive = viewMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.7}
                  onPress={() => setViewMode(mode as ViewMode)}
                  className={`flex-1 py-2.5 items-center rounded-full ${isActive ? 'bg-primary/20' : ''}`}
                >
                  <Text
                    className={`font-bold text-base ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Manual Add Task Header Button Component */}
        <TouchableOpacity
          className="bg-card w-14 h-14 rounded-full items-center justify-center border border-border shadow-clay ml-2 mb-1 mr-1"
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={28} color="hsl(22, 58%, 50%)" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {viewMode === 'Today' && renderToday()}
        {viewMode === 'Week' && <WeekView />}
        {viewMode === 'Month' && <MonthView />}
      </ScrollView>

      {/* Manual Task Creation Bottom Sheet Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View className="bg-background rounded-t-[2rem] p-6 pt-8 pb-10 shadow-lg border-t border-border">
              <Text className="text-2xl font-bold mb-6 text-foreground">
                Manual Override
              </Text>

              <TextInput
                className={`border border-border rounded-xl p-4 mb-4 text-lg bg-secondary ${isCreating ? 'opacity-50' : ''}`}
                value={taskName}
                onChangeText={setTaskName}
                placeholder="Task Name"
                editable={!isCreating}
              />

              <View className="flex-row gap-4 mb-4">
                <TextInput
                  className={`flex-1 border border-border rounded-xl p-4 text-base bg-secondary ${isCreating ? 'opacity-50' : ''}`}
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="Start (HH:mm)"
                  editable={!isCreating}
                />
                <TextInput
                  className={`flex-1 border border-border rounded-xl p-4 text-base bg-secondary ${isCreating ? 'opacity-50' : ''}`}
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="End (HH:mm)"
                  editable={!isCreating}
                />
              </View>

              {/* Category Selection inside modal */}
              <Text className="text-sm font-bold text-muted-foreground mb-2 px-1">
                Tag
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6 flex-none max-h-12 border-b-transparent"
              >
                {['Work', 'Study', 'Health', 'Finance'].map((t) => {
                  const isSelected = tag === t;
                  const colors = TAG_COLORS[t as TaskTag];
                  return (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setTag(t as TaskTag)}
                      disabled={isCreating}
                      className={`mr-3 px-5 py-2.5 rounded-full border ${isSelected ? colors.bg : 'bg-transparent border-border'} ${isSelected ? colors.border : ''} ${isCreating ? 'opacity-50' : ''}`}
                    >
                      <Text
                        className={`font-bold ${isSelected ? colors.text : 'text-muted-foreground'}`}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <ClayButton
                    label="Cancel"
                    variant="outline"
                    onPress={() => setModalVisible(false)}
                    disabled={isCreating}
                  />
                </View>
                <View className="flex-1">
                  <ClayButton
                    label={isCreating ? 'Adding...' : 'Add Task'}
                    variant="primary"
                    onPress={handleCreateTask}
                    disabled={isCreating}
                  />
                </View>
              </View>

              {/* Error Toast specific to Modal */}
              {errorToast ? (
                <View className="mt-4 bg-destructive rounded-xl p-3 flex-row items-center">
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
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
