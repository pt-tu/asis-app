import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClayButton } from '@/components/ui/ClayButton';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const login = useAppStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.replace('/(tabs)/timeline');
  };

  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center p-6">
      <View className="flex-1 justify-center items-center w-full max-w-sm mb-10">
        <View className="w-24 h-24 bg-primary/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/30">
          <Text className="text-primary font-bold text-4xl">A</Text>
        </View>
        <Text className="text-4xl font-bold text-foreground mb-3 text-center">
          A.S.I.S Planner
        </Text>
        <Text className="text-lg text-muted-foreground text-center mb-12">
          Your intelligent assistant for organizing life, automatically.
        </Text>

        <View className="w-full space-y-4 gap-y-4">
          <ClayButton
            label="Continue with Google"
            variant="primary"
            className="w-full h-14"
            onPress={handleLogin}
          />
          <ClayButton
            label="Use Offline Mode"
            variant="outline"
            className="w-full h-14"
            onPress={handleLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
