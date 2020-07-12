import React, { useContext, useEffect } from 'react';
import { List } from 'antd';
import { RouteComponentProps } from '@reach/router';
import style from './Notifications.module.less';
import { useUserNotifications } from './useUserNotifications';
import { LoadingCard } from '../expenses/list/LoadingCard';
import { EmptyEventsList } from '../events/list-utils/EmptyList';
import { renderNotificationItem } from './list-items/renderNotificationItem';
import { UserContext } from '../config/UserProvider';

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
