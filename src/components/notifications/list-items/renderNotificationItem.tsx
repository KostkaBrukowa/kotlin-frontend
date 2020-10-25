import React from 'react';

import {
  NotificationExpenseModel,
  NotificationPartyRequestModel,
  NotificationPaymentModel,
} from '../../mappers/notifications/NotificationMapperTypes';
import { useUserNotifications } from '../graphql/useUserNotifications';
import { ExpenseNotification } from './ExpenseNotification';
import { PartyRequestNotification } from './PartyRequestNotification';
import { PaymentNotification } from './PaymentNotification';

export type NotificationItem = Exclude<
  ReturnType<typeof useUserNotifications>['notifications'],
  null
>[0];

export const renderNotificationItem = (
  notificationModel: NotificationItem,
  userId: string | null,
) => {
  if (notificationModel instanceof NotificationExpenseModel) {
    return <ExpenseNotification notificationModel={notificationModel} userId={userId} />;
  }

  if (notificationModel instanceof NotificationPaymentModel) {
    return <PaymentNotification notificationModel={notificationModel} userId={userId} />;
  }

  if (notificationModel instanceof NotificationPartyRequestModel) {
    return <PartyRequestNotification notificationModel={notificationModel} userId={userId} />;
  }

  return null;
};
