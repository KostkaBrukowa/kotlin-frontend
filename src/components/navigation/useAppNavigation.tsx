import React, { ReactNode } from 'react'; // eslint-disable-line
import { BsBell } from 'react-icons/all';
import UserOutlined from '@ant-design/icons/UserOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import { useLocation } from '@reach/router';

import style from './Toolbar.module.less';
import {
  eventsRoute,
  expenseFormRoute,
  expensesRoute,
  notificationsRoute,
  userRoute,
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
    icon: <DollarOutlined className={style.icon} />,
    to: expensesRoute,
    title: 'Wydatki',
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
    to: expenseFormRoute,
    title: 'Nowy wydatek',
  },
  {
    key: '4',
    icon: <BsBell className={style.icon} />,
    to: notificationsRoute,
    title: 'Aktywność',
  },
  {
    key: '5',
    icon: <UserOutlined className={style.icon} />,
    to: userRoute,
    title: 'Profil',
  },
];

const findMatchingMenuItem = (location: string) =>
  [...menuTabs].sort((a, b) => b.to.length - a.to.length).find((tab) => location.includes(tab.to));

export const useMenuTabs = (): [MenuTabItem[], string[]] => {
  const location = useLocation();
  const matchingTab = findMatchingMenuItem(location.pathname);

  return [menuTabs, matchingTab?.key ? [matchingTab?.key] : []];
};
