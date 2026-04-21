import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react-native';

const ACCENT = 'hsl(22, 58%, 50%)';
const INACTIVE_BG = '#D5CEC7';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onToggle: () => void;
  icon: LucideIcon;
  isLast?: boolean;
}

export function ToggleRow({
  label,
  value,
  onToggle,
  icon: Icon,
  isLast = false,
}: ToggleRowProps) {
  const translateX = useRef(new Animated.Value(value ? 18 : 2)).current;
  const bgAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 18 : 2,
        useNativeDriver: true,
        damping: 15,
        stiffness: 250,
      }),
      Animated.timing(bgAnim, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const trackBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_BG, ACCENT],
  });

  return (
    <View
      className="flex-row items-center px-5 py-4"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
      }}
    >
      {/* Icon */}
      <View
        className="w-8 h-8 rounded-full items-center justify-center mr-3"
        style={{
          backgroundColor: value ? 'rgba(207,123,75,0.12)' : 'rgba(0,0,0,0.05)',
        }}
      >
        <Icon size={16} color={value ? ACCENT : '#8C857B'} />
      </View>

      {/* Label */}
      <Text className="flex-1 text-sm font-medium text-foreground">
        {label}
      </Text>

      {/* Toggle Track */}
      <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
        <Animated.View
          style={{
            width: 44,
            height: 26,
            borderRadius: 13,
            backgroundColor: trackBg,
            justifyContent: 'center',
          }}
        >
          {/* Thumb */}
          <Animated.View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              transform: [{ translateX }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 3,
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
