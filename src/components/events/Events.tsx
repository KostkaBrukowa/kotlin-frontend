import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Tabs } from 'antd';

import { ActionType, AppContext, EventsTabKeys } from '../app-context/AppContext';
import { EventsList } from './event/EventsList';
import { FriendsList } from './friends/FriendsList';
import { GroupsList } from './groups/GroupsList';
import { useUserParties } from './useUserParties';

import style from './Events.module.less';

export type EventsProps = RouteComponentProps;

export const Events: React.FC<EventsProps> = () => {
  const { parties, loading } = useUserParties();
  const {
    state: { activeEventsTab },
    dispatch,
  } = useContext(AppContext);

  const handleTabChange = (key: string) =>
    dispatch({
      type: ActionType.SET_EVENTS_TAB,
      payload: { activeEventsTab: key as EventsTabKeys },
    });

  return (
    <div>
      <div className={style.headerWrapper}>
        <h2 className={style.header}>Twoje:</h2>
        <Button type="primary">Dodaj nowe</Button>
      </div>
      <Tabs activeKey={activeEventsTab} className={style.tabs} onChange={handleTabChange}>
        <Tabs.TabPane key={EventsTabKeys.EVENTS} tab="Wydarzenia">
          <EventsList events={parties?.events} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key={EventsTabKeys.GROUPS} tab="Grupy">
          <GroupsList events={parties?.groups} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key={EventsTabKeys.FRIENDS} tab="Znajomi">
          <FriendsList events={parties?.friends} loading={loading} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
