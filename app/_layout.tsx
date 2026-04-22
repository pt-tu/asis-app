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

import { NAV_THEME } from '../src/constants/nav-theme';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: `hsl(${NAV_THEME.dark.background})`, // NativeWind's Dark Warm Gray
    primary: `hsl(${NAV_THEME.dark.primary})`, // React Navigation tab active color
    text: `hsl(${NAV_THEME.dark['muted-foreground']})`, // Inactive tint color (muted-foreground)
    border: `hsl(${NAV_THEME.dark.border})`, // Tab top border
    card: `hsl(${NAV_THEME.dark.card})`, // Navigation header/tab bg match
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: `hsl(${NAV_THEME.light.background})`, // NativeWind's Beige
    primary: `hsl(${NAV_THEME.light.primary})`,
    text: `hsl(${NAV_THEME.light['muted-foreground']})`,
    border: `hsl(${NAV_THEME.light.border})`,
    card: `hsl(${NAV_THEME.light.card})`,
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
