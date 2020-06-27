import React from 'react';
import { Layout } from 'antd';
import { Router } from '@reach/router';
import style from './AppLayout.module.less';
import { Login } from '../login/Login';
import { Events } from '../events/Events';
import { Friends } from '../friends/Friends';
import { NewExpense } from '../new-expense/NewExpense';
import { Notifications } from '../notifications/Notifications';
import { Settings } from '../settings/Settings';
import {
  eventsRoute,
  friendsRoute,
  loginRoute,
  newExpenseRoute,
  notificationsRoute,
  settingsRoute,
} from './routerConstants';
import { useAuthentication } from '../config/useAuthentication';
import { Toolbar } from './Toolbar';
import { Home } from '../home/Home';
import { AppHeader } from './AppHeader';

const { Footer } = Layout;

export const AppLayout: React.FC = () => {
  const { initialLoading: refreshingToken, setJwtToken, tokenPresent } = useAuthentication();

  return (
    <Layout className={style.wrapper}>
      <AppHeader />
      {!refreshingToken && (
        <>
          <main className={style.mainWrapper}>
            <Router>
              <Home path="/" />
              <Login
                path={`${loginRoute}/*`}
                setJwtToken={setJwtToken}
                tokenPresent={tokenPresent}
              />
              <Events path={eventsRoute} />
              <Friends path={friendsRoute} />
              <NewExpense path={newExpenseRoute} />
              <Notifications path={notificationsRoute} />
              <Settings path={settingsRoute} />
            </Router>
          </main>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          {tokenPresent && <Toolbar />}
        </>
      )}
    </Layout>
  );
};
