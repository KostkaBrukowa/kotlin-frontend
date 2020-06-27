import React, { ReactNode, useEffect } from 'react';
import { useLocation } from '@reach/router';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import NotificationOutlined from '@ant-design/icons/NotificationOutlined';
import ControlOutlined from '@ant-design/icons/ControlOutlined';
import style from './Toolbar.module.less';
import {
  eventsRoute,
  friendsRoute,
  newExpenseRoute,
  notificationsRoute,
  settingsRoute,
} from './routerConstants';

export interface MenuTabItem {
  key: string;
  icon: ReactNode;
  to: string;
  title: string;
}

export const menuTabs: MenuTabItem[] = [
  {
    key: '1',
    icon: <UserOutlined className={style.icon} />,
    to: friendsRoute,
    title: 'Znajomi',
  },
  {
    key: '2',
    icon: <HomeOutlined className={style.icon} />,
    to: eventsRoute,
    title: 'Wydarzenia',
  },
  {
    key: '3',
    icon: <PlusCircleOutlined className={style.icon} />,
    to: newExpenseRoute,
    title: 'Nowy Wydatek',
  },
  {
    key: '4',
    icon: <NotificationOutlined className={style.icon} />,
    to: notificationsRoute,
    title: 'Aktywność',
  },
  {
    key: '5',
    icon: <ControlOutlined className={style.icon} />,
    to: settingsRoute,
    title: 'Ustawienia',
  },
];

const findMatchingMenuItem = (location: string) => menuTabs.find((tab) => tab.to === location);

export const useMenuTabs = (): [MenuTabItem[], string[]] => {
  const location = useLocation();
  const matchingTab = findMatchingMenuItem(location.pathname);

  return [menuTabs, matchingTab?.key ? [matchingTab?.key] : []];
};
