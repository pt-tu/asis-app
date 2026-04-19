import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client/react';

import '../global.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.1.35:4000/graphql' }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
