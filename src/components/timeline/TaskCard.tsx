import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClayCard } from '@/components/ui/ClayCard';
import { TAG_COLORS } from '@/constants/theme';
import { Task } from '@/types';
import { useRouter } from 'expo-router';

export function TaskCard({
  task,
  index,
  prefix = '',
}: {
  task: Task;
  index?: number;
  prefix?: string;
}) {
  const router = useRouter();
  const colors = TAG_COLORS[task.tag];
  const hours = Math.floor(task.duration_minutes / 60);
  const minutes = task.duration_minutes % 60;
  const durationStr =
    `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm' : ''}`.trim();

  return (
    <TouchableOpacity
      key={`${prefix}-${task.id}-${index ?? 0}`}
      onPress={() => router.push(`/details/${task.id}`)}
      activeOpacity={0.8}
    >
      <ClayCard className="mb-4">
        <View
          className={`flex-row items-center border-l-4 pl-3 ${colors.border}`}
        >
          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-1">
              <Text
                className="text-lg font-bold text-foreground flex-1 pr-2"
                numberOfLines={2}
              >
                {task.task_name}
              </Text>
              <View className={`px-2 py-1 rounded-full ${colors.bg}`}>
                <Text className={`text-xs font-bold ${colors.text}`}>
                  {task.tag}
                </Text>
              </View>
            </View>
            <Text className="text-sm text-muted-foreground mt-1 font-medium">
              {task.start_time} - {task.end_time} • {durationStr}
            </Text>
          </View>
        </View>
      </ClayCard>
    </TouchableOpacity>
  );
}
