import { View, Text, TouchableOpacity } from 'react-native';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { Bell } from 'lucide-react-native';

interface DashboardHeaderProps {
  name?: string;
  subtitle?: string;
  onAvatarPress: () => void;
  onBellPress?: () => void;
}

export function DashboardHeader({
  name = 'An',
  subtitle = 'Ready for your clinical goals?',
  onAvatarPress,
  onBellPress,
}: DashboardHeaderProps) {
  return (
    <View className="flex-row items-center py-6">
      {/* Avatar — tappable, navigates to Profile */}
      <UserAvatar
        initial={name.charAt(0).toUpperCase()}
        onPress={onAvatarPress}
      />

      {/* Greeting text group */}
      <View className="flex-1 ml-3">
        <Text
          className="font-bold"
          style={{ fontSize: 18, color: '#3A332C' }}
          numberOfLines={1}
        >
          Hi, {name}!
        </Text>
        <Text
          className="text-sm"
          style={{ color: '#8C857B' }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>

      {/* Notification bell — far right */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBellPress}
        accessibilityLabel="Notifications"
        accessibilityRole="button"
        className="w-11 h-11 rounded-full bg-card items-center justify-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Bell size={20} color="#8C857B" />
      </TouchableOpacity>
    </View>
  );
}
