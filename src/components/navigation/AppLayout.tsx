import React from 'react';
import { Layout } from 'antd';
import { Router } from '@reach/router';
import style from './AppLayout.module.less';
import { Login } from '../login/Login';
import { Events } from '../events/Events';
import { Expenses } from '../expenses/Expenses';
import { NewExpense } from '../new-expense/NewExpense';
import { Notifications } from '../notifications/Notifications';
import { Settings } from '../settings/Settings';
import {
  eventsRoute,
  expensesRoute,
  loginRoute,
  newExpenseRoute,
  notificationsRoute,
  settingsRoute,
} from './routerConstants';
import { useAuthentication } from '../config/authentication/useAuthentication';
import { Toolbar } from './Toolbar';
import { Home } from '../home/Home';
import { AppHeader } from './AppHeader';
import { UserProvider } from '../config/UserProvider';
import { ExpenseView } from '../expenses/expense-view/ExpenseView';

export const AppLayout: React.FC = () => {
  const {
    initialLoading: refreshingToken,
    setAuthData,
    tokenPresent,
    userId,
  } = useAuthentication();

  return (
    <UserProvider userId={userId}>
      <Layout className={style.wrapper}>
        <AppHeader />
        {!refreshingToken && (
          <>
            <main className={style.mainWrapper}>
              <Router>
                <Home path="/" />
                <Login
                  path={`${loginRoute}/*`}
                  setAuthData={setAuthData}
                  tokenPresent={tokenPresent}
                />
                <Events path={eventsRoute} />
                <Expenses path={expensesRoute} />
                <NewExpense path={newExpenseRoute} />
                <ExpenseView path={`${expensesRoute}/:expenseId`} />
                <Notifications path={notificationsRoute} />
                <Settings path={settingsRoute} setAuthData={setAuthData} />
              </Router>
            </main>
            {tokenPresent && <Toolbar />}
          </>
        )}
      </Layout>
    </UserProvider>
  );
};
