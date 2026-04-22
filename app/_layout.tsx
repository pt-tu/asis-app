import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../src/graphql/client';
import { GlobalBottomModal } from '../src/components/ui/GlobalBottomModal';

import '../global.css';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        {/* Global bottom sheet — driven by useBottomModalStore */}
        <GlobalBottomModal />
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
