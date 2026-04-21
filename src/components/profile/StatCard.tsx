import { View, Text } from 'react-native';

interface StatCardProps {
  label: string;
  value: string;
  accentColor?: string;
}

export function StatCard({
  label,
  value,
  accentColor = 'hsl(22, 58%, 50%)',
}: StatCardProps) {
  return (
    <View
      className="items-center justify-center px-5 py-4 rounded-[1.75rem] bg-card mr-3"
      style={{
        minWidth: 110,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text className="text-lg font-bold" style={{ color: accentColor }}>
        {value}
      </Text>
      <Text className="text-xs text-muted-foreground mt-0.5 text-center">
        {label}
      </Text>
    </View>
  );
}
