import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayCard } from '@/components/ui/ClayCard';
import { useRouter } from 'expo-router';
import { ArrowLeft, Activity, Heart, Moon } from 'lucide-react-native';

export default function HealthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background pt-10">
      <View className="px-4 mb-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 bg-muted p-2 rounded-full"
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-foreground flex-1">
          Health Metrics
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Sleep Debt AI Card */}
        <ClayCard className="mb-6 border-l-4 border-l-emerald-400 bg-emerald-50/50">
          <View className="flex-row items-start gap-4">
            <View className="bg-emerald-100 p-2 rounded-full mt-1 flex items-center justify-center">
              <Moon size={24} color="hsl(145, 42%, 49%)" />
            </View>
            <View className="flex-1">
              <Text className="text-emerald-800 font-bold text-lg mb-1">
                AI Clinical Insight
              </Text>
              <Text className="text-emerald-700 font-medium leading-5">
                Post-24h shift detected. Your sleep debt is critical (+8h). A
                6-hour minimum recovery sleep has been slotted into your
                schedule tonight.
              </Text>
            </View>
          </View>
        </ClayCard>

        {/* Weight Target */}
        <Text className="text-xl font-bold text-foreground mb-4 px-2 mt-2">
          Body Metrics
        </Text>
        <View className="flex-row gap-4 mb-8">
          <ClayCard className="flex-1 p-5 items-center justify-center">
            <Text className="text-muted-foreground font-bold text-sm mb-2 uppercase">
              Current
            </Text>
            <Text className="text-4xl font-black text-foreground">
              65<Text className="text-xl text-muted-foreground">kg</Text>
            </Text>
          </ClayCard>

          <View className="justify-center">
            <Activity size={24} color="#a1a1aa" />
          </View>

          <ClayCard className="flex-1 p-5 items-center justify-center bg-emerald-50/30">
            <Text className="text-emerald-700 font-bold text-sm mb-2 uppercase">
              Target
            </Text>
            <Text className="text-4xl font-black text-emerald-800">
              60<Text className="text-xl text-emerald-600/60">kg</Text>
            </Text>
          </ClayCard>
        </View>

        {/* Calorie Ring Summary Mock */}
        <Text className="text-xl font-bold text-foreground mb-4 px-2">
          Nutrition Check
        </Text>
        <ClayCard className="p-6 items-center">
          <View className="relative w-48 h-48 justify-center items-center">
            {/* Outer Mock Ring */}
            <View className="absolute inset-0 rounded-full border-[16px] border-emerald-100" />
            <View
              className="absolute inset-0 rounded-full border-[16px] border-emerald-400 opacity-60"
              style={{
                borderRightColor: 'transparent',
                borderTopColor: 'transparent',
                transform: [{ rotate: '45deg' }],
              }}
            />

            {/* Inner Mock Ring */}
            <View className="absolute inset-4 rounded-full border-[12px] border-orange-100" />
            <View
              className="absolute inset-4 rounded-full border-[12px] border-orange-400 opacity-60"
              style={{
                borderLeftColor: 'transparent',
                borderTopColor: 'transparent',
                transform: [{ rotate: '-45deg' }],
              }}
            />

            <View className="items-center z-10 w-full h-full justify-center">
              <Heart size={32} color="hsl(145, 42%, 49%)" className="mb-1" />
              <Text className="text-2xl font-black text-foreground">850</Text>
              <Text className="text-xs font-bold text-muted-foreground">
                KCAL REMAINING
              </Text>
            </View>
          </View>

          <View className="flex-row w-full justify-between mt-8 px-4">
            <View className="items-center">
              <Text className="text-emerald-600 font-bold mb-1">
                • Calorie In
              </Text>
              <Text className="text-lg font-bold text-foreground">1,250</Text>
            </View>
            <View className="items-center">
              <Text className="text-orange-500 font-bold mb-1">
                • Calorie Out
              </Text>
              <Text className="text-lg font-bold text-foreground">400</Text>
            </View>
          </View>
        </ClayCard>
      </ScrollView>
    </SafeAreaView>
  );
}
