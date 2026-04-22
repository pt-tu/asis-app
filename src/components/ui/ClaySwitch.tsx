import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  SwitchProps,
  ViewStyle,
} from 'react-native';

const ACCENT = 'hsl(22, 58%, 50%)';
const INACTIVE_BG = '#D5CEC7';

export interface ClaySwitchProps extends SwitchProps {}

/**
 * A custom Animated Switch built for the ASIS Claymorphism design system.
 * Acts as a drop-in replacement for React Native's `Switch` component.
 */
export function ClaySwitch({
  value,
  onValueChange,
  disabled = false,
  style,
  ...props
}: ClaySwitchProps) {
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
  }, [value, translateX, bgAnim]);

  const trackBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_BG, ACCENT],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange?.(!value)}
      disabled={disabled}
      style={style as ViewStyle}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...(props as any)}
    >
      <Animated.View
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          backgroundColor: trackBg,
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        }}
      >
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
  );
}
