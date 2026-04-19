import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayCard } from '../../components/ui/ClayCard';
import { useAppStore, TAG_COLORS } from '../../context/useAppStore';
import { useRouter } from 'expo-router';

export default function TimelineScreen() {
  const tasks = useAppStore((state) => state.tasks);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background pt-10">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-4xl font-bold text-foreground mb-2 px-2">
          Today
        </Text>
        <Text className="text-lg text-muted-foreground mb-8 px-2">
          Medical Overview
        </Text>

        <View className="space-y-4">
          {tasks.map((task) => {
            const colors = TAG_COLORS[task.tag];
            const hours = Math.floor(task.duration_minutes / 60);
            const minutes = task.duration_minutes % 60;
            const durationStr =
              `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm' : ''}`.trim();

            return (
              <TouchableOpacity
                key={task.id}
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
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
