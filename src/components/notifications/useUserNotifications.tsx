import { useContext, useEffect } from 'react';

import { useGetUserNotificationsLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { fromResponseList } from '../mappers/notifications/NotificationMapper';

export const useUserNotifications = () => {
  const { userId } = useContext(UserContext);
  const [getNotifications, { data, loading, called }] = useGetUserNotificationsLazyQuery();
  const notifications = data ? fromResponseList(data.findUserNotifications) : null;

  useEffect(() => {
    if (userId !== null) getNotifications({ variables: { userId } });
  }, [userId, getNotifications]);

  return {
    notifications,
    loading: loading || !called,
  };
};
