import React from 'react';
import { LocationProvider } from '@reach/router';
import { AppLayout } from './navigation/AppLayout';

function App() {
  return (
    <LocationProvider>
      <AppLayout />
    </LocationProvider>
  );
}

export default App;
