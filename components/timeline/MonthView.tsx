import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAppStore, Task } from '@/context/useAppStore';
import { X } from 'lucide-react-native';
import { TaskCard } from './TaskCard';
import { MonthHeader } from './MonthHeader';

export function MonthView() {
  const tasks = useAppStore((state) => state.tasks);

  // Navigation State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // Default to April 1, 2026

  // Month Modal State (tasks)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dayTasks, setDayTasks] = useState<Task[]>([]);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setIsLoading(true);
    setModalVisible(true);
    setTimeout(() => {
      setDayTasks(tasks);
      setIsLoading(false);
    }, 600);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Map JS Sunday=0 to Monday=0

    const blanks = Array.from({ length: startOffset }, (_, i) => `blank-${i}`);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return { blanks, daysArray, year, month };
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const { blanks, daysArray, year, month } = generateCalendar();

  return (
    <View>
      <MonthHeader currentDate={currentDate} onDateChange={setCurrentDate} />

      {/* Weekday Labels */}
      <View className="flex-row mb-4">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <View key={`lbl-${i}`} className="flex-1 items-center">
            <Text className="text-xs font-bold text-muted-foreground">
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {blanks.map((blank) => (
          <View
            key={blank}
            style={{ width: `${100 / 7}%` }}
            className="p-1 items-center justify-center min-h-[4rem]"
          />
        ))}
        {daysArray.map((day) => {
          const hasWork = day % 3 === 0;
          const hasHealth = day % 5 === 0;
          const todayFlag = isToday(year, month, day);

          return (
            <View
              key={day}
              style={{ width: `${100 / 7}%` }}
              className="p-1 items-center"
            >
              <TouchableOpacity
                onPress={() => handleDaySelect(day)}
                activeOpacity={0.7}
                className={`w-12 h-14 rounded-2xl items-center justify-center shadow-clay-pop ${
                  todayFlag
                    ? 'bg-orange-50/80 border border-orange-200'
                    : 'bg-card border border-border/50'
                }`}
              >
                <Text
                  className={`font-bold ${todayFlag ? 'text-orange-500' : 'text-foreground'}`}
                >
                  {day}
                </Text>
                <View className="flex-row gap-1 mt-1 justify-center h-1.5">
                  {hasWork && (
                    <View className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  )}
                  {hasHealth && (
                    <View className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Tapped Day's Timeline Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-background rounded-t-3xl p-6 min-h-[60%] max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-foreground">
                Day {selectedDay}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-muted p-2 rounded-full"
              >
                <X size={20} color="#3b2b20" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View className="flex-1 justify-center items-center pt-10">
                <ActivityIndicator size="large" color="hsl(22, 58%, 50%)" />
                <Text className="text-muted-foreground mt-4 font-medium">
                  Loading tasks...
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {dayTasks.map((task, idx) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={idx}
                    prefix="modal"
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
