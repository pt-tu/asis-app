import { Tabs } from 'expo-router';
import { ListTodo, Sparkles, LayoutDashboard } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'hsl(34, 45%, 96%)', // var(--background)
          borderTopColor: 'hsl(30, 20%, 86%)', // var(--border)
          minHeight: 80,
          paddingBottom: 24,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarActiveTintColor: 'hsl(22, 58%, 50%)', // var(--primary)
        tabBarInactiveTintColor: 'hsl(24, 12%, 48%)', // var(--muted-foreground)
      }}
    >
      <Tabs.Screen
        name="timeline"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color, size }) => (
            <ListTodo size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'AI Prompt',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <View className="bg-primary p-3 rounded-full -mt-8 shadow-lg">
              <Sparkles size={24} color="#FDFAF6" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
