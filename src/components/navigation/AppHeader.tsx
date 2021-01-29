import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { navigate, useLocation } from '@reach/router';
import { Badge, Button, Layout } from 'antd';

import { useUserNotifications } from '../notifications/graphql/useUserNotifications';
import { handleSpaceAndEnter } from '../utils/a11n/KeyHandlers';
import logo from './method-draw-image.svg';
import { notificationsRoute } from './routerConstants';
import { menuTabs, useMenuTabs } from './useAppNavigation';

import style from './AppLayout.module.less';

const { Header } = Layout;
const LOGO_SIZE = 32;

const Navigation: React.FC = () => {
  const [tabs] = useMenuTabs();
  const { notifications } = useUserNotifications(false);
  const notificationCount = notifications?.filter((it) => !it?.isRead).length;

  return (
    <div className={style.headerLinks}>
      {tabs.map(({ key, title, to }) => {
        const handleClick = () => navigate(to);

        const element = (
          <Button
            key={key}
            type="link"
            onClick={handleClick}
            onKeyPress={handleSpaceAndEnter(handleClick)}
          >
            {title}
          </Button>
        );

        return to === notificationsRoute && notificationCount ? (
          <Badge count={notificationCount} key={`${key}/notification`}>
            {element}
          </Badge>
        ) : (
          element
        );
      })}
    </div>
  );
};

export const AppHeader: React.FC<{ tokenPresent: boolean }> = ({ tokenPresent }) => {
  const location = useLocation();
  const goHome = () => navigate('/expenses');
  const tabName = menuTabs.find((it) => location.pathname.includes(it.to))?.title;
  const minMd = useMediaQuery({ minWidth: 768 });

  return (
    <Header className={style.header}>
      <div className={style.headerWrapper}>
        <div
          className={style.imageWithHeader}
          role="link"
          tabIndex={0}
          onClick={goHome}
          onKeyPress={handleSpaceAndEnter(goHome)}
        >
          <img alt="" className={style.logo} height={LOGO_SIZE} src={logo} width={LOGO_SIZE} />
          <h1 className={style.appName}>Zrzutka</h1>
        </div>
        {minMd && tokenPresent && <Navigation />}
      </div>
      <h3 className={style.appName}>{tabName}</h3>
    </Header>
  );
};
