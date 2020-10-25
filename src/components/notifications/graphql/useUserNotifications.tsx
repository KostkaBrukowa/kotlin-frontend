import { useContext, useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';

import { useGetUserNotificationsLazyQuery } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { fromResponseList } from '../../mappers/notifications/NotificationMapper';
import {
  NotificationExpenseModel,
  NotificationPartyRequestModel,
  NotificationPaymentModel,
} from '../../mappers/notifications/NotificationMapperTypes';

export interface UserNotificationsReturn {
  refetch?: () => void;
  loading: boolean;
  notifications:
    | (NotificationExpenseModel | null | NotificationPaymentModel | NotificationPartyRequestModel)[]
    | null;
}

export const useUserNotifications = (cacheOnly: boolean): UserNotificationsReturn => {
  const { userId } = useContext(UserContext);
  const [
    getNotifications,
    { data, loading, called, refetch, networkStatus },
  ] = useGetUserNotificationsLazyQuery({
    pollInterval: 10000, // todo
    fetchPolicy: cacheOnly ? 'cache-only' : 'cache-and-network',
  });
  const notifications = data ? fromResponseList(data.findUserNotifications) : null;

  useEffect(() => {
    if (userId !== null) getNotifications({ variables: { userId } });
  }, [userId, getNotifications]);

  return {
    refetch: () => userId !== null && refetch?.({ userId }),
    notifications,
    loading: loading || !called || networkStatus === NetworkStatus.loading,
  };
};
