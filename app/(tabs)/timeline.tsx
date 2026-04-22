import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';
import { useBottomModalStore } from '@/store/useBottomModalStore';
import { TaskCard } from '@/components/timeline/TaskCard';
import { WeekView } from '@/components/timeline/WeekView';
import { MonthView } from '@/components/timeline/MonthView';
import { AddTaskForm } from '@/components/timeline/AddTaskForm';
import { Plus } from 'lucide-react-native';

type ViewMode = 'Today' | 'Week' | 'Month';

export default function TimelineScreen() {
  const tasks = useAppStore((state) => state.tasks);
  const [viewMode, setViewMode] = useState<ViewMode>('Today');

  const { openModal, closeModal } = useBottomModalStore();

  /** Close the global modal (if open), wait for animation, then navigate */
  const handleBeforeNavigate = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      closeModal();
      setTimeout(resolve, 350);
    });
  }, [closeModal]);

  const handleOpenAddTask = useCallback(() => {
    openModal(<AddTaskForm onClose={closeModal} />);
  }, [openModal, closeModal]);

  const renderToday = () => (
    <View className="space-y-4">
      {tasks.map((task, idx) => (
        <TaskCard
          key={task.id}
          task={task}
          index={idx}
          prefix="today"
          onBeforeNavigate={handleBeforeNavigate}
        />
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
            {(['Today', 'Week', 'Month'] as ViewMode[]).map((mode) => {
              const isActive = viewMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.7}
                  onPress={() => setViewMode(mode)}
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

        {/* Add Task Button — opens global bottom modal */}
        <TouchableOpacity
          className="bg-card w-14 h-14 rounded-full items-center justify-center border border-border shadow-clay ml-2 mb-1 mr-1"
          activeOpacity={0.8}
          onPress={handleOpenAddTask}
        >
          <Plus size={28} color="hsl(22, 58%, 50%)" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {viewMode === 'Today' && renderToday()}
        {viewMode === 'Week' && (
          <WeekView onBeforeNavigate={handleBeforeNavigate} />
        )}
        {viewMode === 'Month' && (
          <MonthView onBeforeNavigate={handleBeforeNavigate} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
