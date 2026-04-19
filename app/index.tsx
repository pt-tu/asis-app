import { Redirect } from 'expo-router';
import { useAppStore } from '../context/useAppStore';

export default function Index() {
  const isLoggedIn = useAppStore((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/timeline" />;
  }

  return <Redirect href="/(auth)/login" />;
}
