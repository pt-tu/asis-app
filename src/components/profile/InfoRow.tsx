import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';

const ACCENT = 'hsl(22, 58%, 50%)';

interface InfoRowProps {
  label: string;
  value?: string;
  valueAccent?: boolean;
  icon: LucideIcon;
  onPress?: () => void;
  isLast?: boolean;
}

export function InfoRow({
  label,
  value,
  valueAccent = false,
  icon: Icon,
  onPress,
  isLast = false,
}: InfoRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className="flex-row items-center px-5 py-4"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
      }}
    >
      {/* Icon */}
      <View
        className="w-8 h-8 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <Icon size={16} color="#8C857B" />
      </View>

      {/* Label */}
      <Text className="flex-1 text-sm font-medium text-foreground">
        {label}
      </Text>

      {/* Value + Chevron */}
      <View className="flex-row items-center gap-1">
        {value ? (
          <Text
            className="text-sm font-medium"
            style={{ color: valueAccent ? ACCENT : '#8C857B' }}
          >
            {value}
          </Text>
        ) : null}
        {onPress ? <ChevronRight size={16} color="#C4BDB7" /> : null}
      </View>
    </TouchableOpacity>
  );
}
