import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayCard } from '@/components/ui/ClayCard';
import { useAppStore } from '@/context/useAppStore';
import { useRouter } from 'expo-router';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';

export default function FinanceScreen() {
  const router = useRouter();
  const finance = useAppStore((state) => state.finance);
  const syncMealCostToBudget = useAppStore(
    (state) => state.syncMealCostToBudget,
  );

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
          Finance Hub
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {finance.isOverdraftWarning && (
          <ClayCard className="mb-6 bg-red-50 border-red-200">
            <View className="flex-row items-center gap-3">
              <View className="bg-red-100 p-2 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} color="rgb(220 38 38)" />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-red-800 font-bold text-lg">
                  Budget Overdraft!
                </Text>
                <Text className="text-red-700 text-sm mt-1 leading-5">
                  Food budget is in negative. The system has logged this
                  overage. Consider reallocating funds next week.
                </Text>
              </View>
            </View>
          </ClayCard>
        )}

        <ClayCard className="mb-6 p-5">
          <Text className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-xs">
            Monthly Fixed Income
          </Text>
          <Text className="text-4xl font-black text-foreground mb-4">
            {finance.fixedIncome.toLocaleString()} VND
          </Text>

          <View className="bg-amber-100/50 p-4 rounded-xl border border-amber-200">
            <Text className="text-amber-800 font-bold mb-1 text-lg">
              Major Savings Goal
            </Text>
            <Text className="text-amber-700 font-medium mb-3">
              S26 Ultra - 33m / 6 months
            </Text>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-amber-800/80 font-bold text-xs">
                AUTO-DEDUCT
              </Text>
              <Text className="text-amber-900 font-bold">-5,500,000 VND</Text>
            </View>
          </View>
        </ClayCard>

        <Text className="text-xl font-bold text-foreground mb-4 mt-2 px-2">
          Budget Allocation
        </Text>

        <View className="flex-row flex-wrap justify-between mb-6">
          <ClayCard className="w-[48%] mb-4 py-4 px-3">
            <Text className="text-muted-foreground font-bold text-sm mb-1">
              Food
            </Text>
            <Text
              className={`text-xl font-bold ${finance.isOverdraftWarning ? 'text-red-600' : 'text-foreground'}`}
            >
              {finance.foodBudget.toLocaleString()}
            </Text>
          </ClayCard>

          <ClayCard className="w-[48%] mb-4 py-4 px-3">
            <Text className="text-muted-foreground font-bold text-sm mb-1">
              Study
            </Text>
            <Text className="text-xl font-bold text-foreground">
              {finance.studyBudget.toLocaleString()}
            </Text>
          </ClayCard>

          <ClayCard className="w-[48%] py-4 px-3">
            <Text className="text-muted-foreground font-bold text-sm mb-1">
              Health
            </Text>
            <Text className="text-xl font-bold text-foreground">
              {finance.healthBudget.toLocaleString()}
            </Text>
          </ClayCard>
        </View>

        <Text className="text-xl font-bold text-foreground mb-4 px-2">
          Burn Rate Velocity
        </Text>
        <ClayCard className="p-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-muted-foreground font-medium">
              Safe Spending
            </Text>
            <Text className="text-foreground font-bold text-lg">75%</Text>
          </View>
          <View className="h-3 bg-muted rounded-full w-full">
            <View className="absolute top-0 left-0 bottom-0 w-3/4 rounded-full bg-amber-400" />
          </View>
          <Text className="text-center text-sm font-medium text-muted-foreground mt-4">
            You are burning money at a stable rate.
          </Text>
        </ClayCard>

        <TouchableOpacity
          className="mt-6 mx-2"
          activeOpacity={0.8}
          onPress={() => syncMealCostToBudget(1500000)} // simulate overdraft for demo
        >
          <View className="bg-accent py-4 rounded-xl items-center shadow-sm">
            <Text className="text-white font-bold text-lg">
              Simulate Large Meal (-1.5m)
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
