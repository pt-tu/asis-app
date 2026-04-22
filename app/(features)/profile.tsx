import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import {
  Moon,
  Globe,
  ShieldAlert,
  BedDouble,
  Bell,
  Sparkles,
  CreditCard,
  RefreshCw,
  LogOut,
} from 'lucide-react-native';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatCard } from '@/components/profile/StatCard';
import { SettingSection } from '@/components/profile/SettingSection';
import { ToggleRow } from '@/components/profile/ToggleRow';
import { InfoRow } from '@/components/profile/InfoRow';
import { useThemeStore } from '@/store/useThemeStore';

const ACCENT = 'hsl(22, 58%, 50%)';
const MINT = 'hsl(145, 42%, 49%)';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();
  const [emergencyProtocols, setEmergencyProtocols] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dailyBriefing, setDailyBriefing] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Back navigation bar */}
      <View className="px-4 pt-2 pb-0 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="bg-muted p-2 rounded-full mr-3"
        >
          <ArrowLeft size={20} color="hsl(22, 58%, 50%)" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Title */}
        <Text className="text-4xl font-bold text-foreground px-6 pt-4 pb-2">
          Profile
        </Text>

        {/* A — Profile Header */}
        <ProfileHeader />

        {/* B — Stats Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          className="mb-4"
        >
          <StatCard label="AI Level" value="Pro" accentColor={ACCENT} />
          <StatCard label="Tasks Done" value="142" accentColor={MINT} />
          <StatCard label="On-call Shifts" value="4" accentColor={ACCENT} />
        </ScrollView>

        {/* C — Settings Sections */}

        {/* Preferences */}
        <SettingSection title="Preferences">
          <ToggleRow
            icon={Moon}
            label="Dark Mode"
            value={theme === 'dark'}
            onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <InfoRow icon={Globe} label="Language" value="English" isLast />
        </SettingSection>

        {/* Clinical & Health */}
        <SettingSection title="Clinical & Health">
          <ToggleRow
            icon={ShieldAlert}
            label="Emergency Protocols Access"
            value={emergencyProtocols}
            onToggle={() => setEmergencyProtocols((v) => !v)}
          />
          <InfoRow
            icon={BedDouble}
            label="Sleep Debt Tracking"
            value="Active"
            valueAccent
            isLast
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <ToggleRow
            icon={Bell}
            label="Push Notifications"
            value={pushNotifications}
            onToggle={() => setPushNotifications((v) => !v)}
          />
          <ToggleRow
            icon={Sparkles}
            label="Daily AI Briefing"
            value={dailyBriefing}
            onToggle={() => setDailyBriefing((v) => !v)}
            isLast
          />
        </SettingSection>

        {/* Account */}
        <SettingSection title="Account">
          <InfoRow
            icon={CreditCard}
            label="Subscription"
            value="Pro Plan"
            valueAccent
            onPress={() => {}}
          />
          <InfoRow
            icon={RefreshCw}
            label="Sync Data"
            onPress={() => {}}
            isLast
          />
        </SettingSection>

        {/* D — Danger Zone */}
        <View className="px-4 mt-2">
          <TouchableOpacity
            activeOpacity={0.75}
            className="rounded-[1.75rem] py-4 items-center justify-center"
            style={{
              backgroundColor: 'rgba(220,38,38,0.07)',
              borderWidth: 1,
              borderColor: 'rgba(220,38,38,0.15)',
            }}
          >
            <View className="flex-row items-center gap-2">
              <LogOut size={16} color="#DC2626" />
              <Text
                className="text-sm font-semibold"
                style={{ color: '#DC2626' }}
              >
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
