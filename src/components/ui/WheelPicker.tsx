import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface WheelPickerProps {
  items: string[];
  initialValue: string;
  onValueChange: (value: string) => void;
  itemHeight?: number;
}

/**
 * A purely JS-driven WheelPicker using FlatList.
 * Supports snapping, padding at top/bottom, and updates value on scroll end.
 */
export function WheelPicker({
  items,
  initialValue,
  onValueChange,
  itemHeight = 44,
}: WheelPickerProps) {
  const flatListRef = useRef<FlatList>(null);

  // Find index of the initial selected value
  const initialIndex = Math.max(0, items.indexOf(initialValue));
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // We add 'padding' empty items to top and bottom to allow the first/last items to center.
  // Assuming picker visible container height is itemHeight * 5 (2 above, 1 center, 2 below)
  const paddingItems = 2; // Fixed number of empty slots above/below the center element
  const paddedItems = useMemo(() => {
    const pad = Array(paddingItems).fill('');
    return [...pad, ...items, ...pad];
  }, [items]);

  useEffect(() => {
    // Initial scroll to the selected item
    if (flatListRef.current && initialIndex >= 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: initialIndex * itemHeight,
          animated: false,
        });
      }, 0);
    }
  }, [initialIndex, itemHeight]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    // Calculate the centered index
    const index = Math.round(y / itemHeight);

    // Bounds check
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

    if (clampedIndex !== selectedIndex) {
      setSelectedIndex(clampedIndex);
      onValueChange(items[clampedIndex]);
    }
  };

  return (
    <View className="flex-1 w-full">
      <FlatList
        ref={flatListRef}
        data={paddedItems}
        keyExtractor={(_item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        renderItem={({ item, index }) => {
          // Actual index in the items array (ignoring top padding)
          const dataIndex = index - paddingItems;
          const isSelected = dataIndex === selectedIndex;
          const isPadding = dataIndex < 0 || dataIndex >= items.length;

          return (
            <View
              style={{ height: itemHeight }}
              className="justify-center items-center"
            >
              {!isPadding && (
                <Text
                  className={`text-center ${
                    isSelected
                      ? 'text-foreground font-bold text-2xl'
                      : 'text-muted-foreground text-lg opacity-60'
                  }`}
                >
                  {item}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
