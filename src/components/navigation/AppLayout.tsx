import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from '@reach/router';
import style from './AppLayout.module.less';
import { Toolbar } from './Toolbar';
import logo from './google-maps.svg';

const LOGO_SIZE = 32;

const { Header, Content, Footer, Sider } = Layout;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <Layout className={style.wrapper}>
      <Header className={style.header} onClick={goHome}>
        <img alt="logo" className={style.logo} height={LOGO_SIZE} src={logo} width={LOGO_SIZE} />
        <h1 className={style.appName}>Wisesplit</h1>
      </Header>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      <Toolbar />
    </Layout>
  );
};
