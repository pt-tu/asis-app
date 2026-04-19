import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClayCard } from '../../components/ui/ClayCard';
import { ClayButton } from '../../components/ui/ClayButton';
import { useAppStore, TAG_COLORS } from '../../context/useAppStore';

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();

  const idStr = Array.isArray(taskId) ? taskId[0] : taskId;
  const task = useAppStore((state) => state.tasks.find((t) => t.id === idStr));

  if (!task) {
    return (
      <SafeAreaView className="flex-1 bg-background pt-8 items-center justify-center">
        <Text className="text-xl text-muted-foreground font-bold">
          Task not found
        </Text>
        <Text className="text-muted-foreground mt-2 mb-6">
          It may have been deleted or doesn't exist.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-6 py-3 bg-primary rounded-full"
        >
          <Text className="text-primary-foreground font-bold text-lg">
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const colors = TAG_COLORS[task.tag];

  return (
    <SafeAreaView className="flex-1 bg-background pt-8">
      <View className="flex-row items-center px-4 mb-4">
        <TouchableOpacity onPress={() => router.back()} className="px-2 py-2">
          <Text className="text-primary font-medium text-lg">← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <ClayCard className="p-6 min-h-[300px]">
          <View className="flex-row justify-between items-start mb-6">
            <View className={`px-4 py-1.5 rounded-full ${colors.bg}`}>
              <Text className={`text-sm font-bold ${colors.text}`}>
                {task.tag}
              </Text>
            </View>
            <Text className="text-sm font-bold text-muted-foreground pt-1">
              {task.start_time} - {task.end_time}
            </Text>
          </View>

          <Text className="text-3xl font-bold text-foreground mb-4 leading-tight">
            {task.task_name}
          </Text>
          <Text className="text-lg text-muted-foreground leading-relaxed mb-8">
            Duration: {Math.round(task.duration_minutes / 60)}h{' '}
            {task.duration_minutes % 60 ? `${task.duration_minutes % 60}m` : ''}
          </Text>

          <View className="mt-auto space-y-4 gap-y-4">
            <ClayButton label="Mark as Complete" variant="primary" />
            <ClayButton label="Edit Task" variant="outline" />
          </View>
        </ClayCard>
      </ScrollView>
    </SafeAreaView>
  );
}
