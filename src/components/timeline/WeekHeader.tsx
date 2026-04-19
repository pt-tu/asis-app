import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface WeekHeaderProps {
  dateRangeText: string;
  onPrev: () => void;
  onNext: () => void;
}

export function WeekHeader({ dateRangeText, onPrev, onNext }: WeekHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-6 px-1">
      <TouchableOpacity
        onPress={onPrev}
        activeOpacity={0.7}
        className="w-10 h-10 items-center justify-center bg-card rounded-full shadow-clay-pop border border-border/50"
      >
        <ChevronLeft size={20} color="#3b2b20" />
      </TouchableOpacity>

      <Text className="text-lg font-bold text-foreground">{dateRangeText}</Text>

      <TouchableOpacity
        onPress={onNext}
        activeOpacity={0.7}
        className="w-10 h-10 items-center justify-center bg-card rounded-full shadow-clay-pop border border-border/50"
      >
        <ChevronRight size={20} color="#3b2b20" />
      </TouchableOpacity>
    </View>
  );
}
