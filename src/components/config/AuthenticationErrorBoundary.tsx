import React from 'react';

import style from './ErrorBoundary.module.less';

interface State {
  error: string | null;
}

export class AuthenticationErrorBoundary extends React.Component<{}, State> {
  public readonly state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: any) {
    return { error: error.toString() };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      // You can render any custom fallback UI
      return (
        <div className={style.wrapper}>
          <h1>
            Wystąpił nieoczekiwany błąd. Odśwież stronę. Jeżeli ci się chce to powiadom programistę
            o błędzie na jiirra@gmail.com. Błąd który warto przesłać programiście: {error}
          </h1>
        </div>
      );
    }

    return children;
  }
}
