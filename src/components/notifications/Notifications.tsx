import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { List } from 'antd';

import { UserContext } from '../config/UserProvider';
import { EmptyEventsList } from '../events/list-utils/EmptyList';
import { LoadingCard } from '../expenses/list/LoadingCard';
import { renderNotificationItem } from './list-items/renderNotificationItem';
import { useUserNotifications } from './useUserNotifications';

import style from './Notifications.module.less';

export type NotificationsProps = RouteComponentProps;

export const Notifications: React.FC<NotificationsProps> = (props) => {
  const { userId } = useContext(UserContext);
  const { notifications, loading } = useUserNotifications();
  const listPlaceholder = { emptyText: <EmptyEventsList type="powiadomień" /> };

  useEffect(
    () => () => {
      console.log('on unmount');
    },
    [],
  );

  return (
    <>
      <h2 className={style.header}>Twoje powiadomienia:</h2>
      {!loading ? (
        <List
          dataSource={notifications ?? []}
          locale={listPlaceholder}
          renderItem={(item) => renderNotificationItem(item, userId)}
          size="large"
        />
      ) : (
        <LoadingCard cardsCount={3} />
      )}
    </>
  );
};
