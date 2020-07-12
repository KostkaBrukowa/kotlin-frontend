import React from 'react';
import { Layout } from 'antd';
import { useLocation, useNavigate } from '@reach/router';
import style from './AppLayout.module.less';
import logo from './google-maps.svg';
import { menuTabs } from './useAppNavigation';

const { Header } = Layout;
const LOGO_SIZE = 32;

export const AppHeader: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const goHome = () => navigate('/');
  const tabName = menuTabs.find((it) => location.pathname.includes(it.to))?.title;

  return (
    <Header className={style.header}>
      <div className={style.imageWithHeader} onClick={goHome}>
        <img alt="logo" className={style.logo} height={LOGO_SIZE} src={logo} width={LOGO_SIZE} />
        <h1 className={style.appName}>Wisesplit</h1>
      </div>
      <h3 className={style.appName}>{tabName}</h3>
    </Header>
  );
};
