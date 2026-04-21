import { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

const ACCENT = 'hsl(22, 58%, 50%)';

interface UserAvatarProps {
  initial?: string;
  size?: number;
  onPress: () => void;
}

export function UserAvatar({
  initial = 'A',
  size = 46,
  onPress,
}: UserAvatarProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
      damping: 14,
      stiffness: 300,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 12,
      stiffness: 250,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel="Open profile"
      accessibilityRole="button"
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: ACCENT,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Text
          style={{
            color: ACCENT,
            fontSize: size * 0.39,
            fontWeight: '700',
            letterSpacing: 0.5,
          }}
        >
          {initial}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
