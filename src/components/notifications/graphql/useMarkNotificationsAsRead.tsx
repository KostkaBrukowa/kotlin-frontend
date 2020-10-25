import { useCallback } from 'react';

import { useMarkNotificationsAsReadMutation } from '../../../generated/graphql';
import { UserNotificationsReturn } from './useUserNotifications';

export const useMarkNotificationsAsRead = () => {
  const [markAsRead, { loading }] = useMarkNotificationsAsReadMutation();
  const markAsReadCallback = useCallback(
    (notifications: UserNotificationsReturn['notifications']) => {
      const notificationIds =
        (notifications
          ?.filter((it) => !it?.isRead)
          .map((it) => it?.id)
          .filter(Boolean) as string[]) ?? [];

      if (notificationIds.length > 0) {
        markAsRead({
          variables: { notificationIds },
        });
      }
    },
    [],
  );

  return {
    loading,
    markAsRead: markAsReadCallback,
  };
};
