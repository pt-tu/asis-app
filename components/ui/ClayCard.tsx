import { View, ViewProps, Platform } from 'react-native';
import { cssInterop } from 'nativewind';

export function ClayCard({
  children,
  className = '',
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={`bg-card rounded-[1.75rem] border border-border/50 ${className}`}
      style={Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 18,
        },
        android: {
          elevation: 6,
        },
      })}
      {...props}
    >
      <View className="flex-1 bg-white/30 rounded-[1.75rem] overflow-hidden p-4 border-t border-white/70">
        {children}
      </View>
    </View>
  );
}

cssInterop(ClayCard, { className: 'style' });
