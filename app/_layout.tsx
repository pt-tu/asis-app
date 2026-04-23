import { useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../src/graphql/client';
import { GlobalBottomModal } from '../src/components/ui/GlobalBottomModal';
import { useThemeStore } from '../src/store/useThemeStore';

import '../global.css';

import { NAV_THEME_HSL } from '../src/constants/theme';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: NAV_THEME_HSL.dark.background, // NativeWind's Dark Warm Gray
    primary: NAV_THEME_HSL.dark.primary, // React Navigation tab active color
    text: NAV_THEME_HSL.dark['muted-foreground'], // Inactive tint color (muted-foreground)
    border: NAV_THEME_HSL.dark.border, // Tab top border
    card: NAV_THEME_HSL.dark.card, // Navigation header/tab bg match
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: NAV_THEME_HSL.light.background, // NativeWind's Beige
    primary: NAV_THEME_HSL.light.primary,
    text: NAV_THEME_HSL.light['muted-foreground'],
    border: NAV_THEME_HSL.light.border,
    card: NAV_THEME_HSL.light.card,
  },
};

export default function RootLayout() {
  const { theme } = useThemeStore();
  const { setColorScheme } = useNativeWindColorScheme();
  const deviceTheme = useDeviceColorScheme();

  useEffect(() => {
    if (theme === 'system') {
      setColorScheme(deviceTheme ?? 'light');
    } else {
      setColorScheme(theme);
    }
  }, [theme, deviceTheme, setColorScheme]);

  // Determine active theme
  const activeMode = theme === 'system' ? (deviceTheme ?? 'light') : theme;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        value={activeMode === 'dark' ? customDarkTheme : customDefaultTheme}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <GlobalBottomModal />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ApolloProvider>
  );
}
