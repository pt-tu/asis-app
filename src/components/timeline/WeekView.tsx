import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { TaskCard } from './TaskCard';
import { WeekHeader } from './WeekHeader';

export function WeekView() {
  const tasks = useAppStore((state) => state.tasks);
  const { width } = useWindowDimensions();
  // Visual affordance: 5.5 items visible so the 6th is cut in half indicating scrollability.
  const dayWidth = width / 5.5;

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [weekOffset, setWeekOffset] = useState(0);

  // Generate 7 days mapping based on today + weekOffset
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + weekOffset * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    const day = baseDate.getDay(); // 0 is Sunday
    const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1) + i; // Monday start
    d.setDate(diff);
    return d;
  });

  const daysNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const startDay = weekDays[0];
  const endDay = weekDays[6];
  const dateRangeText = `${monthNames[startDay.getMonth()]} ${startDay.getDate()} - ${monthNames[endDay.getMonth()]} ${endDay.getDate()}, ${endDay.getFullYear()}`;

  const isToday = (date: Date) => {
    const t = new Date();
    return (
      date.getDate() === t.getDate() &&
      date.getMonth() === t.getMonth() &&
      date.getFullYear() === t.getFullYear()
    );
  };

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  return (
    <View>
      <WeekHeader
        dateRangeText={dateRangeText}
        onPrev={handlePrevWeek}
        onNext={handleNextWeek}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-8"
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {weekDays.map((d, i) => {
          const isSelected =
            d.getDate() === currentDate.getDate() &&
            d.getMonth() === currentDate.getMonth();
          const todayFlag = isToday(d);
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              onPress={() => setCurrentDate(d)}
              style={{ width: dayWidth - 12 }} // Account for gap
              className={`items-center justify-center py-4 rounded-full ${
                isSelected ? 'bg-white shadow-clay-pop' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-xs font-bold mb-1 ${
                  isSelected || todayFlag
                    ? 'text-orange-500'
                    : 'text-muted-foreground'
                }`}
              >
                {daysNames[i]}
              </Text>
              <Text
                className={`text-xl font-black ${
                  isSelected
                    ? 'text-amber-950'
                    : todayFlag
                      ? 'text-orange-500'
                      : 'text-muted-foreground'
                }`}
              >
                {d.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View className="space-y-4">
        {tasks.map((task, idx) => (
          <TaskCard key={task.id} task={task} index={idx} prefix="week" />
        ))}
      </View>
    </View>
  );
}
