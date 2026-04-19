import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayCard } from '../../components/ui/ClayCard';
import { DollarSign, Activity } from 'lucide-react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background pt-10">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-4xl font-bold text-foreground mb-8 px-2">
          Overview
        </Text>

        <View className="flex-row gap-4 mb-6">
          <ClayCard className="flex-1 p-4 items-center justify-center min-h-[140px]">
            <View className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <DollarSign size={24} color="hsl(22, 58%, 50%)" />
            </View>
            <Text className="text-sm text-muted-foreground font-medium text-center">
              Monthly Budget
            </Text>
            <Text className="text-2xl font-bold text-foreground mt-1 text-center">
              Remaining
            </Text>
          </ClayCard>

          <ClayCard className="flex-1 p-4 items-center justify-center min-h-[140px]">
            <View className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
              <Activity size={24} color="hsl(145, 42%, 49%)" />
            </View>
            <Text className="text-sm text-muted-foreground font-medium text-center">
              Health Goals
            </Text>
            <Text className="text-2xl font-bold text-foreground mt-1 text-center">
              On Track
            </Text>
          </ClayCard>
        </View>

        <Text className="text-xl font-bold text-foreground mb-4 px-2 mt-2">
          Recent Insights
        </Text>
        <ClayCard className="mb-4">
          <Text className="text-lg font-bold text-foreground mb-2">
            Spending Alert
          </Text>
          <Text className="text-muted-foreground leading-relaxed">
            You've spent more on dining out this week compared to last week.
            Consider home-cooked meals to stay within budget.
          </Text>
        </ClayCard>
      </ScrollView>
    </SafeAreaView>
  );
}
