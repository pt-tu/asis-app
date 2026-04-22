import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { WheelPicker } from '@/components/ui/WheelPicker';
import { ClayButton } from '@/components/ui/ClayButton';

interface ClayTimePickerProps {
  title?: string;
  initialValue?: string; // "HH:mm"
  onConfirm: (time: string) => void;
  onCancel: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0'),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);

/**
 * Pure JS Time Picker respecting Neo-Minimalism and Claymorphism.
 * Replaces the native datetime picker to prevent OS UI fragmentation.
 */
export function ClayTimePicker({
  title = 'Select Time',
  initialValue = '12:00',
  onConfirm,
  onCancel,
}: ClayTimePickerProps) {
  const [hours, setHours] = useState(initialValue.split(':')[0] || '12');
  const [minutes, setMinutes] = useState(initialValue.split(':')[1] || '00');

  const ITEM_HEIGHT = 44;
  const VISIBLE_ITEMS = 5;
  const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS; // 220px

  return (
    <View className="w-full">
      <Text className="text-2xl font-bold text-center text-foreground mb-8">
        {title}
      </Text>

      {/* FIXED HEIGHT PICKER AREA */}
      <View
        className="flex-row items-center justify-center w-full mb-8 relative"
        style={{ height: PICKER_HEIGHT }}
        pointerEvents="box-none"
      >
        {/* Highlight Selection Box */}
        <View
          className="absolute bg-[#CF7B4B]/10 rounded-2xl w-48"
          style={{ height: ITEM_HEIGHT, zIndex: 0 }}
          pointerEvents="none"
        />

        <View
          className="flex-row items-center justify-between"
          style={{ width: 160, height: '100%', zIndex: 1 }}
          pointerEvents="box-none"
        >
          {/* Hours */}
          <View className="flex-1 h-full items-center">
            <WheelPicker
              items={HOURS}
              initialValue={hours}
              onValueChange={setHours}
              itemHeight={ITEM_HEIGHT}
            />
          </View>

          <Text
            className="text-3xl font-bold text-foreground mx-2"
            style={{ zIndex: 1 }}
          >
            :
          </Text>

          {/* Minutes */}
          <View className="flex-1 h-full items-center">
            <WheelPicker
              items={MINUTES}
              initialValue={minutes}
              onValueChange={setMinutes}
              itemHeight={ITEM_HEIGHT}
            />
          </View>
        </View>
      </View>

      {/* ACTION AREA (Outside fixed height) */}
      <View className="flex-row gap-4 mt-2">
        <View className="flex-1">
          <ClayButton label="Cancel" variant="outline" onPress={onCancel} />
        </View>
        <View className="flex-1">
          <ClayButton
            label="Confirm"
            variant="primary"
            onPress={() => onConfirm(`${hours}:${minutes}`)}
          />
        </View>
      </View>
    </View>
  );
}
