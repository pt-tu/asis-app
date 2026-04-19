import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/context/useAppStore';
import { TaskCard } from '@/components/timeline/TaskCard';
import { WeekView } from '@/components/timeline/WeekView';
import { MonthView } from '@/components/timeline/MonthView';

type ViewMode = 'Today' | 'Week' | 'Month';

export default function TimelineScreen() {
  const tasks = useAppStore((state) => state.tasks);
  const [viewMode, setViewMode] = useState<ViewMode>('Today');

  const renderToday = () => (
    <View className="space-y-4">
      {tasks.map((task, idx) => (
        <TaskCard key={task.id} task={task} index={idx} prefix="today" />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background pt-10">
      <View className="px-4 mb-6">
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

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {viewMode === 'Today' && renderToday()}
        {viewMode === 'Week' && <WeekView />}
        {viewMode === 'Month' && <MonthView />}
      </ScrollView>
    </SafeAreaView>
  );
}
