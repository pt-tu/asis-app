import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

export function ClayCard({
  children,
  className = '',
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={`bg-card rounded-[1.75rem] shadow-clay border border-transparent dark:border-border ${className}`}
      {...props}
    >
      <View className="flex-1 bg-white/20 dark:bg-transparent rounded-[1.75rem] overflow-hidden p-4 border-t-2 border-l-2 border-shadow-light">
        {children}
      </View>
    </View>
  );
}

cssInterop(ClayCard, { className: 'style' });
