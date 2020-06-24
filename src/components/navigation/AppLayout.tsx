import React from 'react';
import { Layout } from 'antd';
import { Router, useNavigate } from '@reach/router';
import style from './AppLayout.module.less';
import logo from './google-maps.svg';
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

const LOGO_SIZE = 32;

const { Header, Content, Footer, Sider } = Layout;

export const AppLayout: React.FC = () => {
  const { initialLoading: refreshingToken, setJwtToken, tokenPresent } = useAuthentication();
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <Layout className={style.wrapper}>
      <Header className={style.header} onClick={goHome}>
        <img alt="logo" className={style.logo} height={LOGO_SIZE} src={logo} width={LOGO_SIZE} />
        <h1 className={style.appName}>Wisesplit</h1>
      </Header>
      {!refreshingToken && (
        <>
          <Router>
            <Home path="/" />
            <Login path={loginRoute} setJwtToken={setJwtToken} tokenPresent={tokenPresent} />
            <Events path={eventsRoute} />
            <Friends path={friendsRoute} />
            <NewExpense path={newExpenseRoute} />
            <Notifications path={notificationsRoute} />
            <Settings path={settingsRoute} />
          </Router>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          <Toolbar />
        </>
      )}
    </Layout>
  );
};
