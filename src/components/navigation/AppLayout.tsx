import React from 'react';
import { Router } from '@reach/router';
import { Layout } from 'antd';

import { useAuthentication } from '../config/authentication/useAuthentication';
import { UserProvider } from '../config/UserProvider';
import { EventForm } from '../events/event-form/EventForm';
import { EventView } from '../events/event/view/EventView';
import { Events } from '../events/Events';
import { FriendsEventView } from '../events/friends/view/FriendsEventView';
import { GroupView } from '../events/groups/view/GroupView';
import { ExpenseView } from '../expenses/expense-view/ExpenseView';
import { Expenses } from '../expenses/Expenses';
import { PaymentView } from '../expenses/payment-view/PaymentView';
import { Home } from '../home/Home';
import { Login } from '../login/Login';
import { ExpenseForm } from '../new-expense/ExpenseForm';
import { Notifications } from '../notifications/Notifications';
import { FriendsView } from '../settings/friends-view/FriendsView';
import { UserView } from '../settings/UserView';
import { ResourceNotFound } from '../utils/not-found/ResourceNotFound';
import { AppHeader } from './AppHeader';
import {
  eventFormRoute,
  eventsEventRoute,
  eventsFiendsRoute,
  eventsGroupRoute,
  eventsRoute,
  expenseFormRoute,
  expensesRoute,
  friendsRoute,
  loginRoute,
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
                <EventForm path={eventFormRoute} />
                <EventForm path={`${eventFormRoute}/:eventId`} />
                <EventView path={`${eventsEventRoute}/:eventId/*`} />
                <GroupView path={`${eventsGroupRoute}/:groupId/*`} />
                <FriendsEventView path={`${eventsFiendsRoute}/:friendsId/*`} />

                <Expenses path={expensesRoute} />
                <ExpenseForm path={expenseFormRoute} />
                <ExpenseForm path={`${expenseFormRoute}/:expenseId`} />
                <ExpenseView path={`${expensesRoute}/:expenseId`} />
                <PaymentView path={`${paymentsRoute}/:paymentId/*`} />

                <Notifications path={notificationsRoute} />

                <UserView path={settingsRoute} setAuthData={setAuthData} />
                <FriendsView path={friendsRoute} />

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
