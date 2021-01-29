import React from 'react';
import { Router } from '@reach/router';

import { AuthData } from '../config/authentication/useAuthentication';
import { EventForm } from '../events/event-form/EventForm';
import { EventRedirect } from '../events/event-redirect/EventRedirect';
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
import { CurrentUserView } from '../settings/CurrentUserView';
import { FriendsView } from '../settings/friends-view/FriendsView';
import { UserView } from '../user/UserView';
import { ResourceNotFound } from '../utils/not-found/ResourceNotFound';
import {
  eventFormRoute,
  eventsEventRoute,
  eventsFriendsRoute,
  eventsGroupRoute,
  eventsRoute,
  expenseFormRoute,
  expensesRoute,
  friendsRoute,
  loginRoute,
  notificationsRoute,
  paymentsRoute,
  settingsRoute,
  unknownEventTypeRoute,
  userRoute,
} from './routerConstants';

import style from './AppLayout.module.less';

export interface MainContentProps {
  tokenPresent: boolean;
  setAuthData(authData: AuthData): void;
}

export const MainContent: React.FC<MainContentProps> = ({ tokenPresent, setAuthData }) => (
  <main className={style.mainWrapper}>
    <Router>
      <ResourceNotFound default tokenPresent={tokenPresent} />
      <Login path={`${loginRoute}/*`} setAuthData={setAuthData} tokenPresent={tokenPresent} />
      {tokenPresent && (
        <>
          <Home path="/" />

          <Events path={eventsRoute} />
          <EventRedirect path={`${unknownEventTypeRoute}/:eventId`} />
          <EventForm path={eventFormRoute} />
          <EventForm path={`${eventFormRoute}/:eventId`} />
          <EventView path={`${eventsEventRoute}/:eventId/*`} />
          <GroupView path={`${eventsGroupRoute}/:groupId/*`} />
          <FriendsEventView path={`${eventsFriendsRoute}/:friendsId/*`} />

          <Expenses path={expensesRoute} />
          <ExpenseForm path={expenseFormRoute} />
          <ExpenseForm path={`${expenseFormRoute}/:expenseId`} />
          <ExpenseView path={`${expensesRoute}/:expenseId`} />
          <PaymentView path={`${paymentsRoute}/:paymentId/*`} />

          <Notifications path={notificationsRoute} />

          <CurrentUserView path={userRoute} setAuthData={setAuthData} />
          <CurrentUserView path={settingsRoute} setAuthData={setAuthData} />
          <UserView path={`${userRoute}/:userId`} />
          <FriendsView path={friendsRoute} />
        </>
      )}
    </Router>
  </main>
);
