import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, RouteComponentProps } from '@reach/router';
import { Button, Tabs } from 'antd';

import { ActionType, AppContext, EventsTabKeys } from '../app-context/AppContext';
import { eventFormRoute } from '../navigation/routerConstants';
import { EventsList } from './event/EventsList';
import { FriendEventsList } from './friends/FriendEventsList';
import { GroupsList } from './groups/GroupsList';
import { PartyRequestsList } from './party-requests/PartyRequestsList';
import { useUserParties } from './useUserParties';

import style from './Events.module.less';

export type EventsProps = RouteComponentProps;

export const Events: React.FC<EventsProps> = () => {
  const { parties, loading } = useUserParties();
  const {
    state: { activeEventsTab },
    dispatch,
  } = useContext(AppContext);
  const minTablet = useMediaQuery({ minWidth: 768 });

  const handleTabChange = (key: string) =>
    dispatch({
      type: ActionType.SET_EVENTS_TAB,
      payload: { activeEventsTab: key as EventsTabKeys },
    });

  return (
    <div>
      <div className={style.headerWrapper}>
        <h2 className={style.header}>Twoje:</h2>
        <Button type="primary">
          <Link to={`${eventFormRoute}`}>Dodaj nowe</Link>
        </Button>
      </div>
      <Tabs
        centered
        activeKey={activeEventsTab}
        className={style.tabs}
        size={minTablet ? 'large' : undefined}
        onChange={handleTabChange}
      >
        <Tabs.TabPane key={EventsTabKeys.EVENTS} tab="Wydarzenia">
          <EventsList events={parties?.events} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key={EventsTabKeys.GROUPS} tab="Grupy">
          <GroupsList events={parties?.groups} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key={EventsTabKeys.FRIENDS} tab="Znajomi">
          <FriendEventsList friends={parties?.friends} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane key={EventsTabKeys.INVITES} tab="Zaproszenia">
          <PartyRequestsList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
