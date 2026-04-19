import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react-native';

interface MonthHeaderProps {
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
}

export function MonthHeader({ currentDate, onDateChange }: MonthHeaderProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const nextMonth = () =>
    onDateChange(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    onDateChange(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonthName = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <View className="flex-row justify-between items-center mb-6 px-1 z-50">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setPickerVisible(true)}
        className="flex-row items-center gap-2 bg-card px-4 py-2 rounded-full border border-border/50 shadow-clay-pop"
      >
        <Text className="text-lg font-bold text-foreground">
          {currentMonthName}
        </Text>
        <ChevronDown size={20} color="#3b2b20" />
      </TouchableOpacity>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={prevMonth}
          activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center bg-card rounded-full border border-border/50 shadow-clay-pop"
        >
          <ChevronLeft size={20} color="#3b2b20" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextMonth}
          activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center bg-card rounded-full border border-border/50 shadow-clay-pop"
        >
          <ChevronRight size={20} color="#3b2b20" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPickerVisible(false)}
          className="flex-1 bg-black/40 justify-center items-center p-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            className="bg-background rounded-[2rem] w-full p-6 shadow-clay-pop border border-border/50"
          >
            <Text className="text-2xl font-bold text-foreground mb-6 text-center mt-2">
              {currentDate.getFullYear()}
            </Text>
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {monthNames.map((m, idx) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    onDateChange(new Date(currentDate.getFullYear(), idx, 1));
                    setPickerVisible(false);
                  }}
                  className={`w-[30%] py-4 items-center rounded-2xl ${
                    currentDate.getMonth() === idx
                      ? 'bg-white shadow-clay-pop border-2 border-orange-200'
                      : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`font-bold ${currentDate.getMonth() === idx ? 'text-orange-500' : 'text-muted-foreground'}`}
                  >
                    {m.substring(0, 3).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
