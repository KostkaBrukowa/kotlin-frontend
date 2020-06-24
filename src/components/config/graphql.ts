import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { navigate } from '@reach/router';
import { message as antDMessage } from 'antd';
import { JWT_TOKEN } from './useAuthentication';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return forward(operation);
});

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

      if (message.includes('Token was not valid')) {
        navigate('/login').then(() => {
          antDMessage.info('Aby kontynuować zaloguj się pnownie.');
        });
      } else {
        antDMessage.info(message);
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, authMiddleware, httpLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  credentials: 'include',
});
