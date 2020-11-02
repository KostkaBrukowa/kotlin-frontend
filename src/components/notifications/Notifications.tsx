import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, List } from 'antd';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { UserContext } from '../config/UserProvider';
import { EmptyEventsList } from '../events/common/EmptyList';
import { LoadingCard } from '../expenses/list/LoadingCard';
import { NotOptional } from '../utils/types';
import { useMarkNotificationsAsRead } from './graphql/useMarkNotificationsAsRead';
import { UserNotificationsReturn, useUserNotifications } from './graphql/useUserNotifications';
import { renderNotificationItem } from './list-items/renderNotificationItem';

import style from './Notifications.module.less';

export type NotificationsProps = RouteComponentProps;

export const NotificationsList: React.FC<{
  notifications: NotOptional<UserNotificationsReturn['notifications']>;
}> = ({ notifications }) => {
  const { userId } = useContext(UserContext);
  const listPlaceholder = { emptyText: <EmptyEventsList type="powiadomień" /> };
  const { markAsRead } = useMarkNotificationsAsRead();

  useDeepCompareEffect(
    () => () => {
      if (notifications && notifications.some((it) => !it?.isRead)) {
        markAsRead(notifications);
      }
    },
    [notifications],
  );

  return (
    <List
      dataSource={notifications.sort(
        (left, right) => (right?.createdAt.getTime() ?? 0) - (left?.createdAt.getTime() ?? 0),
      )}
      locale={listPlaceholder}
      renderItem={(item) => renderNotificationItem(item, userId)}
      size="large"
    />
  );
};

export const Notifications: React.FC<NotificationsProps> = () => {
  const { notifications, loading, refetch } = useUserNotifications(true);

  return (
    <>
      <div className={style.headerWrapper}>
        <h2 className={style.header}>Twoje powiadomienia:</h2>
        <Button loading={loading} type="primary" onClick={refetch}>
          Odśwież
        </Button>
      </div>
      {!loading ? (
        <NotificationsList notifications={notifications ?? []} />
      ) : (
        <LoadingCard cardsCount={3} />
      )}
    </>
  );
};
