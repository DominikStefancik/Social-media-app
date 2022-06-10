import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: React.ReactElement;
}

export default (rootElement: ApolloProviderProps) => {
  return <ApolloProvider client={client}>{rootElement.children}</ApolloProvider>;
};
