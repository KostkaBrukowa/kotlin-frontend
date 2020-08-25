import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { LocationProvider } from '@reach/router';

import { AppContextProvider } from './app-context/AppContext';
import { AuthenticationErrorBoundary } from './config/AuthenticationErrorBoundary';
import { client } from './config/graphql';
import { AppLayout } from './navigation/AppLayout';

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
