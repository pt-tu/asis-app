import { View, Text, TouchableOpacity } from 'react-native';
import { User, Pencil } from 'lucide-react-native';

const ACCENT = 'hsl(22, 58%, 50%)';

export function ProfileHeader() {
  return (
    <View className="items-center pt-6 pb-4 px-4">
      {/* Avatar */}
      <View
        className="w-24 h-24 rounded-full bg-card items-center justify-center mb-4"
        style={{
          shadowColor: ACCENT,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
          borderWidth: 3,
          borderColor: 'rgba(207,123,75,0.2)',
        }}
      >
        <User size={40} color={ACCENT} />
      </View>

      {/* Name */}
      <Text className="text-3xl font-bold text-foreground tracking-tight">
        An
      </Text>

      {/* Subtitle */}
      <Text className="text-sm text-muted-foreground mt-1 mb-5">
        Medical Intern / Software Dev
      </Text>

      {/* Edit Profile Pill */}
      <TouchableOpacity
        activeOpacity={0.75}
        className="flex-row items-center gap-2 px-6 py-2.5 rounded-full"
        style={{
          backgroundColor: ACCENT,
          shadowColor: ACCENT,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <Pencil size={14} color="#FDFAF6" />
        <Text className="text-sm font-semibold" style={{ color: '#FDFAF6' }}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
