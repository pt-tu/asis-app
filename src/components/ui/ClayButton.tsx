import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  Platform,
  View,
} from 'react-native';
import { cssInterop } from 'nativewind';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function ClayButton({
  label,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'outline':
        return 'bg-transparent border border-primary';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-foreground';
      case 'secondary':
        return 'text-secondary-foreground';
      case 'outline':
        return 'text-primary';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`rounded-full flex-row items-center justify-center min-h-[48px] px-6 py-3 ${getVariantClasses()} ${className}`}
      style={
        variant !== 'outline'
          ? Platform.select({
              ios: {
                shadowColor: variant === 'primary' ? '#d97706' : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: variant === 'primary' ? 0.3 : 0.1,
                shadowRadius: 8,
              },
              android: {
                elevation: 4,
              },
            })
          : {}
      }
      {...props}
    >
      {variant !== 'outline' && (
        <View className="absolute inset-0 rounded-full border-t border-white/30 pointer-events-none" />
      )}
      <Text className={`font-semibold text-lg ${getTextColor()}`}>{label}</Text>
    </TouchableOpacity>
  );
}

cssInterop(ClayButton, { className: 'style' });
