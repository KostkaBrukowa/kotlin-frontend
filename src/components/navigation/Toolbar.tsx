import React from 'react';
import { Link, navigate } from '@reach/router';
import { Badge, Menu } from 'antd';
import clsx from 'clsx';

import { useUserNotifications } from '../notifications/graphql/useUserNotifications';
import { handleSpaceAndEnter } from '../utils/a11n/KeyHandlers';
import { notificationsRoute } from './routerConstants';
import { useMenuTabs } from './useAppNavigation';

import style from './Toolbar.module.less';

const menuItemClassName = (title: string, active: boolean) =>
  clsx(`data-cy-${title}`, style.optionWrapper, {
    [style.activeOptionWrapper]: active,
  });
const menuClassName = clsx('data-cy-toolbar', style.toolbarWrapper);

interface ToolbarProps {
  // notificationCount: number;
}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [tabs, activeTab] = useMenuTabs();
  const { notifications, loading } = useUserNotifications(false);
  const notificationCount = notifications?.filter((it) => !it?.isRead).length;

  return (
    <div className={menuClassName}>
      {tabs.map(({ key, icon, to, title }) => {
        const handleClick = () => navigate(to);

        const element = (
          <>
            <div
              className={menuItemClassName(title, key === activeTab[0])}
              key={key}
              role="link"
              tabIndex={0}
              onClick={handleClick}
              onKeyPress={handleSpaceAndEnter(handleClick)}
            >
              {icon}
              <span className={style.link}>{title}</span>
            </div>
          </>
        );

        return to === notificationsRoute && notificationCount ? (
          <Badge count={notificationCount} offset={[-10, 0]}>
            {element}
          </Badge>
        ) : (
          element
        );
      })}
    </div>
  );
};
