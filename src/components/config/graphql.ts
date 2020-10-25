import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/link-error';
import { navigate } from '@reach/router';
import { message as antDMessage } from 'antd';

import possibleTypes from '../../generated/possiblTypes.json';
import { nonAuthenticatedRoutes } from '../navigation/routerConstants';
import { JWT_TOKEN } from './authentication/useAuthentication';

const isNonAuthenticatedRoute = () => {
  const { pathname } = window.location;

  return nonAuthenticatedRoutes.some((route) => pathname.includes(route));
};

const authMiddleware = new ApolloLink((operation, forward) => {
  if (JWT_TOKEN) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  }

  return forward(operation);
});

const handleGraphqlErrors = ({ graphQLErrors }: Pick<ErrorResponse, 'graphQLErrors'>) => {
  // eslint-disable-next-line no-unused-expressions
  graphQLErrors?.forEach(({ message, locations, path }) => {
    if (message.includes('Token was not valid')) {
      if (!isNonAuthenticatedRoute()) {
        navigate('/login').then(() => antDMessage.info('Aby kontynuować zaloguj się ponownie.'));
      }
    } else {
      antDMessage.info(message);
    }

    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
  });
};

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    handleGraphqlErrors({ graphQLErrors });
  }

  if (networkError) {
    antDMessage.info('Brak połączenia z serwerem.');
    console.log(`[Network error]: ${networkError}`);
  }
});

// @ts-ignore
const link = from([errorLink, authMiddleware, httpLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache({
    possibleTypes,
  }),
  link,
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
