import compareAsc from 'date-fns/compareAsc';

import { dateFrom } from '../../utils/functions/date';
import {
  NotificationExpenseModel,
  NotificationExpenseType,
  NotificationPartyRequestModel,
  NotificationPartyRequestType,
  NotificationPaymentModel,
  NotificationPaymentType,
  NotificationResponseListType,
} from './NotificationMapperTypes';

function mapExpenseNotification(notification: NotificationExpenseType): NotificationExpenseModel {
  const { id, type, createdAt, event, isRead, expenseId, actor, receiver } = notification;

  return new NotificationExpenseModel(
    expenseId,
    id,
    type,
    dateFrom(createdAt),
    event,
    isRead,
    actor ?? null,
    receiver ?? null,
  );
}

function mapPaymentNotification(notification: NotificationPaymentType): NotificationPaymentModel {
  const { id, type, createdAt, event, isRead, paymentId, actor, receiver } = notification;

  return new NotificationPaymentModel(
    paymentId,
    id,
    type,
    dateFrom(createdAt),
    event,
    isRead,
    actor ?? null,
    receiver ?? null,
  );
}

function mapPartyRequestNotification(
  notification: NotificationPartyRequestType,
): NotificationPartyRequestModel {
  const { id, type, createdAt, event, isRead, partyId, actor, receiver } = notification;

  return new NotificationPartyRequestModel(
    partyId,
    id,
    type,
    dateFrom(createdAt),
    event,
    isRead,
    actor ?? null,
    receiver ?? null,
  );
}

export function fromResponseList(notifications: NotificationResponseListType) {
  const expenseNotifications = notifications
    .map((it) => (it.__typename === 'ExpenseNotification' ? mapExpenseNotification(it) : null))
    .filter(Boolean);
  const paymentNotifications = notifications
    .map((it) => (it.__typename === 'PaymentNotification' ? mapPaymentNotification(it) : null))
    .filter(Boolean);
  const partyRequestNotifications = notifications
    .map((it) =>
      it.__typename === 'PartyRequestNotification' ? mapPartyRequestNotification(it) : null,
    )
    .filter(Boolean);

  return [...expenseNotifications, ...paymentNotifications, ...partyRequestNotifications]
    .filter((it) => !it?.isRead)
    .sort((left, right) => compareAsc(left!.createdAt, right!.createdAt));
}
