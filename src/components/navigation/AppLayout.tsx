import React from 'react';
import { Router } from '@reach/router';
import { Layout } from 'antd';

import { useAuthentication } from '../config/authentication/useAuthentication';
import { UserProvider } from '../config/UserProvider';
import { EventView } from '../events/event/view/EventView';
import { Events } from '../events/Events';
import { FriendsView } from '../events/friends/view/FriendsView';
import { GroupView } from '../events/groups/view/GroupView';
import { ExpenseView } from '../expenses/expense-view/ExpenseView';
import { Expenses } from '../expenses/Expenses';
import { PaymentView } from '../expenses/payment-view/PaymentView';
import { Home } from '../home/Home';
import { Login } from '../login/Login';
import { NewExpense } from '../new-expense/NewExpense';
import { Notifications } from '../notifications/Notifications';
import { Settings } from '../settings/Settings';
import { ResourceNotFound } from '../utils/not-found/ResourceNotFound';
import { AppHeader } from './AppHeader';
import {
  eventsEventRoute,
  eventsFiendsRoute,
  eventsGroupRoute,
  eventsRoute,
  expensesRoute,
  loginRoute,
  newExpenseRoute,
  notificationsRoute,
  paymentsRoute,
  settingsRoute,
} from './routerConstants';
import { Toolbar } from './Toolbar';

import style from './AppLayout.module.less';

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
                <EventView path={`${eventsEventRoute}/:eventId/*`} />
                <GroupView path={`${eventsGroupRoute}/:groupId/*`} />
                <FriendsView path={`${eventsFiendsRoute}/:friendsId/*`} />

                <Expenses path={expensesRoute} />
                <NewExpense path={newExpenseRoute} />
                <ExpenseView path={`${expensesRoute}/:expenseId`} />
                <PaymentView path={`${paymentsRoute}/:paymentId/*`} />

                <Notifications path={notificationsRoute} />

                <Settings path={settingsRoute} setAuthData={setAuthData} />

                <ResourceNotFound default />
              </Router>
            </main>
            {tokenPresent && <Toolbar />}
          </>
        )}
      </Layout>
    </UserProvider>
  );
};
