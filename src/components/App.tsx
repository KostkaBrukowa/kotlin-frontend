import React from 'react';
import { LocationProvider } from '@reach/router';
import { ApolloProvider } from '@apollo/client';

import { AppLayout } from './navigation/AppLayout';
import { client } from './config/graphql';
import { AuthenticationErrorBoundary } from './config/AuthenticationErrorBoundary';

function App() {
  return (
    <LocationProvider>
      <ApolloProvider client={client}>
        <AuthenticationErrorBoundary>
          <AppLayout />
        </AuthenticationErrorBoundary>
      </ApolloProvider>
    </LocationProvider>
  );
}

export default App;
