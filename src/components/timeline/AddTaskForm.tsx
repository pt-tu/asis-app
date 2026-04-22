import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ClayButton } from '@/components/ui/ClayButton';
import { ClayTimePicker } from '@/components/ui/ClayTimePicker';
import { TAG_COLORS } from '@/constants/theme';
import { TaskTag } from '@/types';
import { useMutation } from '@apollo/client/react';
import { CREATE_TASK_MUTATION } from '@/graphql/mutations/task';

interface Props {
  onClose: () => void;
}

/**
 * Dumb form component for manually creating a new task.
 * Rendered inside the GlobalBottomModal via useBottomModalStore.openModal().
 * Owns its form state internally; communicates completion via `onClose`.
 */
export function AddTaskForm({ onClose }: Props) {
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [tag, setTag] = useState<TaskTag>('Work');
  const [errorMsg, setErrorMsg] = useState('');
  const [pickingMode, setPickingMode] = useState<'start' | 'end' | null>(null);

  const [createTask, { loading: isCreating }] =
    useMutation(CREATE_TASK_MUTATION);

  const handleCreate = async () => {
    if (!taskName.trim() || !startTime || !endTime) {
      setErrorMsg('Please fill all required fields');
      return;
    }
    setErrorMsg('');
    try {
      await createTask({
        variables: {
          input: {
            task_name: taskName.trim(),
            start_time: startTime,
            end_time: endTime,
            duration_minutes: 60,
            tag,
          },
        },
        refetchQueries: ['GetTasks'],
      });
      onClose();
    } catch {
      setErrorMsg('Failed to create task. Please try again.');
    }
  };

  if (pickingMode === 'start') {
    return (
      <ClayTimePicker
        title="Select Start Time"
        initialValue={startTime}
        onCancel={() => setPickingMode(null)}
        onConfirm={(time: string) => {
          setStartTime(time);
          setPickingMode(null);
        }}
      />
    );
  }

  if (pickingMode === 'end') {
    return (
      <ClayTimePicker
        title="Select End Time"
        initialValue={endTime}
        onCancel={() => setPickingMode(null)}
        onConfirm={(time: string) => {
          setEndTime(time);
          setPickingMode(null);
        }}
      />
    );
  }

  return (
    <View>
      <Text className="text-2xl font-bold mb-6 text-foreground">
        Manual Override
      </Text>

      {/* Task Name */}
      <TextInput
        className={`border border-border rounded-xl p-4 mb-4 text-lg bg-secondary text-foreground ${isCreating ? 'opacity-50' : ''}`}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Task Name"
        placeholderTextColor="hsl(24, 12%, 48%)"
        editable={!isCreating}
        returnKeyType="done"
      />

      {/* Time Pickers via buttons and View Swapping */}
      <View className="flex-row gap-4 mb-4">
        <TouchableOpacity
          className={`flex-1 border border-border rounded-xl p-4 bg-secondary flex-row items-center ${isCreating ? 'opacity-50' : ''}`}
          activeOpacity={0.7}
          onPress={() => !isCreating && setPickingMode('start')}
        >
          <Text className="text-base flex-1 text-foreground">
            Start: {startTime}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 border border-border rounded-xl p-4 bg-secondary flex-row items-center ${isCreating ? 'opacity-50' : ''}`}
          activeOpacity={0.7}
          onPress={() => !isCreating && setPickingMode('end')}
        >
          <Text className="text-base flex-1 text-foreground">
            End: {endTime}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tag Selection */}
      <Text className="text-sm font-bold text-muted-foreground mb-2 px-1">
        Tag
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6 flex-none max-h-12"
      >
        {(['Work', 'Study', 'Health', 'Finance'] as TaskTag[]).map((t) => {
          const isSelected = tag === t;
          const colors = TAG_COLORS[t];
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setTag(t)}
              disabled={isCreating}
              className={`mr-3 px-5 py-2.5 rounded-full border ${
                isSelected
                  ? `${colors.bg} ${colors.border}`
                  : 'bg-transparent border-border'
              } ${isCreating ? 'opacity-50' : ''}`}
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

      {/* Error */}
      {errorMsg ? (
        <Text className="text-destructive font-bold text-sm mb-4">
          {errorMsg}
        </Text>
      ) : null}

      {/* Actions */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <ClayButton
            label="Cancel"
            variant="outline"
            onPress={onClose}
            disabled={isCreating}
          />
        </View>
        <View className="flex-1">
          <ClayButton
            label={isCreating ? 'Adding...' : 'Add Task'}
            variant="primary"
            onPress={handleCreate}
            disabled={isCreating}
          />
        </View>
      </View>
    </View>
  );
}
