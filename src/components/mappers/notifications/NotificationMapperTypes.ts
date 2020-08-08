import {
  ExpenseNotification,
  GetUserNotificationsQuery,
  Maybe,
  NotificationEvent,
  NotificationTypeEnum,
  PartyRequestNotification,
  PaymentNotification,
  UserType,
} from '../../../generated/graphql';

export type NotificationResponseListType = GetUserNotificationsQuery['findUserNotifications'];

export type NotificationUser = Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;

export type NotificationExpenseType = { __typename?: 'ExpenseNotification' } & Pick<
  ExpenseNotification,
  'expenseId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
> & {
    actor?: NotificationUser;
    receiver?: NotificationUser;
  };

export type NotificationPartyRequestType = { __typename?: 'PartyRequestNotification' } & Pick<
  PartyRequestNotification,
  'partyId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
> & {
    actor?: NotificationUser;
    receiver?: NotificationUser;
  };

export type NotificationPaymentType = { __typename?: 'PaymentNotification' } & Pick<
  PaymentNotification,
  'paymentId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
> & {
    actor?: NotificationUser;
    receiver?: NotificationUser;
  };

export class NotificationExpenseModel {
  public constructor(
    readonly expenseId: string,
    readonly id: string,
    readonly type: NotificationTypeEnum,
    readonly createdAt: Date,
    readonly event: NotificationEvent,
    readonly isRead: boolean,
    readonly actor: NotificationUser | null,
    readonly receiver: NotificationUser | null,
  ) {}
}

export class NotificationPartyRequestModel {
  public constructor(
    readonly partyId: string,
    readonly id: string,
    readonly type: NotificationTypeEnum,
    readonly createdAt: Date,
    readonly event: NotificationEvent,
    readonly isRead: boolean,
    readonly actor: NotificationUser | null,
    readonly receiver: NotificationUser | null,
  ) {}
}

export class NotificationPaymentModel {
  public constructor(
    readonly paymentId: string,
    readonly id: string,
    readonly type: NotificationTypeEnum,
    readonly createdAt: Date,
    readonly event: NotificationEvent,
    readonly isRead: boolean,
    readonly actor: NotificationUser | null,
    readonly receiver: NotificationUser | null,
  ) {}
}
