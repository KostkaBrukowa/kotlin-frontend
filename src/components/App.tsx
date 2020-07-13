import React from 'react';
import { LocationProvider } from '@reach/router';
import { ApolloProvider } from '@apollo/client';

import { CookiesProvider } from 'react-cookie';
import { AppLayout } from './navigation/AppLayout';
import { client } from './config/graphql';
import { AuthenticationErrorBoundary } from './config/AuthenticationErrorBoundary';
import { AppContextProvider } from './app-context/AppContext';

function App() {
  return (
    <LocationProvider>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <AppContextProvider>
            <AuthenticationErrorBoundary>
              <AppLayout />
            </AuthenticationErrorBoundary>
          </AppContextProvider>
        </ApolloProvider>
      </CookiesProvider>
    </LocationProvider>
  );
}

export default App;
