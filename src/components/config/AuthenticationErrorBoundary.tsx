import React from 'react';

interface State {
  hasError: boolean;
}

export class AuthenticationErrorBoundary extends React.Component<{}, State> {
  public readonly state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: any) {
    console.log('Error', error);

    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
