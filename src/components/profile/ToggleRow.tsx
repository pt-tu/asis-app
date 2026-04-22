import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { ClaySwitch } from '@/components/ui/ClaySwitch';

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
      <ClaySwitch value={value} onValueChange={onToggle} />
    </View>
  );
}
