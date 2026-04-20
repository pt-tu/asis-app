import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

if (!apiUrl) {
  console.warn('API_URL is not defined in environment variables');
}

export const client = new ApolloClient({
  link: new HttpLink({
    uri: apiUrl || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});
