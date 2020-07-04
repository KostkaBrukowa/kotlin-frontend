import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/link-error';
import { navigate } from '@reach/router';
import { message as antDMessage } from 'antd';
import { JWT_TOKEN } from './authentication/useAuthentication';
import { nonAuthenticatedRoutes } from '../navigation/routerConstants';
import possibleTypes from '../../generated/possiblTypes.json';

const isNonAuthenticatedRoute = () => {
  const { pathname } = window.location;

  return nonAuthenticatedRoutes.some((route) => pathname.includes(route));
};

const handleGraphqlErrors = ({ graphQLErrors }: Pick<ErrorResponse, 'graphQLErrors'>) => {
  // eslint-disable-next-line no-unused-expressions
  graphQLErrors?.forEach(({ message, locations, path }) => {
    if (message.includes('Token was not valid')) {
      if (!isNonAuthenticatedRoute()) {
        navigate('/login').then(() => antDMessage.info('Aby kontynuować zaloguj się pnownie.'));
      }
    } else {
      antDMessage.info(message.split(':')[1]);
    }

    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
  });
};

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    handleGraphqlErrors({ graphQLErrors });
  }

  if (networkError) {
    antDMessage.info('Brak polączenia z serwerem.');
    console.log(`[Network error]: ${networkError}`);
  }
});
const link = from([errorLink, authMiddleware, httpLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache({
    possibleTypes,
  }),
  link,
  credentials: 'include',
});
