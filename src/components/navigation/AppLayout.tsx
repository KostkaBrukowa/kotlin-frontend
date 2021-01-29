import React from 'react';
import { Layout, Spin } from 'antd';

import { useAuthentication } from '../config/authentication/useAuthentication';
import { AuthenticationErrorBoundary } from '../config/AuthenticationErrorBoundary';
import { UserProvider } from '../config/UserProvider';
import { AppHeader } from './AppHeader';
import { AppSpinner } from './AppSpinner';
import { MainContent } from './MainContent';
import { Toolbar } from './Toolbar';

import style from './AppLayout.module.less';

export const AppLayout: React.FC = () => {
  const {
    initialLoading: initialRefreshingToken,
    setAuthData,
    tokenPresent,
    userId,
  } = useAuthentication();

  console.log('RefreshingToken', initialRefreshingToken);
  console.log('TokenPresent', tokenPresent);

  return (
    <UserProvider userId={userId}>
      <AuthenticationErrorBoundary>
        <Layout className={style.wrapper}>
          <AppHeader tokenPresent={tokenPresent} />
          {initialRefreshingToken ? (
            <AppSpinner />
          ) : (
            <MainContent setAuthData={setAuthData} tokenPresent={tokenPresent} />
          )}

          {/* <Layout.Footer style={{ textAlign: 'center' }}> */}
          {/*  Aprint ©2021 Stworzone przez Jarosław Glegoła */}
          {/* </Layout.Footer> */}
        </Layout>
      </AuthenticationErrorBoundary>
      {tokenPresent && <Toolbar />}
    </UserProvider>
  );
};
