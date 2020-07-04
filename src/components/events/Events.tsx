import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Tabs } from 'antd';
import { useUserParties } from './useUserParties';
import style from './Events.module.less';

export type EventsProps = RouteComponentProps;

export const Events: React.FC<EventsProps> = (props) => {
  const { parties } = useUserParties();
  console.log('Parties', parties);

  return (
    <div>
      <div className={style.headerWrapper}>
        <h2 className={style.header}>Twoje:</h2>
        <Button type="primary">Dodaj nowe</Button>
      </div>
      <Tabs animated className={style.tabs} defaultActiveKey="1" onChange={() => {}}>
        <Tabs.TabPane key="1" tab="Wydarzenia">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Grupy">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Znajomi">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
