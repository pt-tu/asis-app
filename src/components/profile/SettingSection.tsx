import { View, Text } from 'react-native';
import { ReactNode } from 'react';

interface SettingSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <View className="mb-5 px-4">
      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
        {title}
      </Text>
      <View
        className="bg-card rounded-[1.75rem] overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 14,
          elevation: 3,
        }}
      >
        {children}
      </View>
    </View>
  );
}
