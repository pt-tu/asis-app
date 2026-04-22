import React from 'react';
import { Pressable, Text, PressableProps, View, Platform } from 'react-native';
import { cssInterop } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Helper to merge Tailwind classes using clsx and tailwind-merge
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'rounded-full flex-row items-center justify-center min-h-[48px] px-6 py-3',
  {
    variants: {
      variant: {
        primary: 'bg-primary shadow-clay',
        secondary: 'bg-secondary shadow-clay',
        outline: 'bg-transparent border-2 border-primary/50',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const textVariants = cva('font-bold text-lg', {
  variants: {
    variant: {
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      outline: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ButtonProps
  extends PressableProps, VariantProps<typeof buttonVariants> {
  label: string;
  className?: string;
  textClassName?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ClayButton({
  label,
  variant = 'primary',
  className = '',
  textClassName = '',
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const isSolid = variant === 'primary' || variant === 'secondary';
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 300,
      mass: 0.5,
    });
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
      mass: 0.5,
    });
    if (onPressOut) onPressOut(e);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      className={cn(buttonVariants({ variant }), className)}
      style={[
        animatedStyle,
        isSolid && Platform.OS === 'android' ? { elevation: 4 } : undefined,
      ]}
      {...props}
    >
      {({ pressed }) => (
        <>
          {/* Highlight/Shadow Inset Layer for Non-Outline Variants */}
          {isSolid && (
            <View
              className={cn(
                'absolute inset-0 rounded-full border-2 pointer-events-none transition-colors duration-200',
                pressed
                  ? 'border-t-black/20 border-l-black/20 border-b-white/20 border-r-white/20 dark:border-t-black/50 dark:border-l-black/50 dark:border-b-white/5 dark:border-r-white/5'
                  : 'border-t-white/30 border-l-white/30 border-b-black/20 border-r-black/20 dark:border-t-white/10 dark:border-l-white/10 dark:border-b-black/40 dark:border-r-black/40',
              )}
            />
          )}

          {/* Button Text */}
          <Text className={cn(textVariants({ variant }), textClassName)}>
            {label}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

cssInterop(ClayButton, { className: 'style' });
