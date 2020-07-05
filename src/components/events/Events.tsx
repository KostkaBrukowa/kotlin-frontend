import { RouteComponentProps } from '@reach/router';
import { Button, Tabs } from 'antd';
import React from 'react';
import style from './Events.module.less';
import { EventsList } from './events/EventsList';
import { useUserParties } from './useUserParties';
import { GroupsList } from './groups/GroupsList';
import { FriendsList } from './friends/FriendsList';

export type EventsProps = RouteComponentProps;

export const Events: React.FC<EventsProps> = () => {
  const { parties, loading } = useUserParties();
  console.log('Loading', loading);

  return (
    <div>
      <div className={style.headerWrapper}>
        <h2 className={style.header}>Twoje:</h2>
        <Button type="primary">Dodaj nowe</Button>
      </div>
      <Tabs animated className={style.tabs} defaultActiveKey="3" onChange={() => {}}>
        <Tabs.TabPane key="1" tab="Wydarzenia">
          <EventsList events={parties?.events} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Grupy">
          <GroupsList events={parties?.groups} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Znajomi">
          <FriendsList events={parties?.friends} loading={loading} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
