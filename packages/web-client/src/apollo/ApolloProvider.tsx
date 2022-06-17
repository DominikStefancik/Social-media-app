import React, { ReactElement, useContext } from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthContext } from '../context/AuthProvider';

interface ApolloProviderProps {
  children: ReactElement;
}

/**
 * Creating the ApolloClient must be done inside the functional component returning the ApolloProvider. The reasons are the following:
 *  1. We want to create a middleware called "authLink" which will append the authorisation token to each request send by the Apollo client.
 *  2. In order to get the authorisation token, we call a hook "useContext" to get it from the AuthContext.
 *  3. We can call the hook only inside a React functional component. Otherwise, an error will be thrown.
 *
 */
export default (rootElement: ApolloProviderProps) => {
  // we have to call "useContext" hook to get the token inside a functional component
  const authContext = useContext(AuthContext);

  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  // "setContext" function works as a middleware
  // it adds an authorisation token to each request before the Apolllo client sends it to a server
  const authLink = setContext((request, previousContext) => {
    const token = authContext.user?.token;

    return {
      headers: {
        ...previousContext.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              // this says that whenever we update the Apollo cache for the query "posts", use the updated data (e.g. after deletion of a post)
              merge: (existing, incoming) => {
                return incoming;
              },
            },
            comments: {
              merge: (existing, incoming) => {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={client}>{rootElement.children}</ApolloProvider>;
};
