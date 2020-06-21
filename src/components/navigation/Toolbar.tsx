import React from 'react';
import { Menu } from 'antd';
import { Link } from '@reach/router';
import { MenuTabItem, useMenuTabs } from './useAppNavigation';
import style from './Toolbar.module.less';

export const Toolbar: React.FC = () => {
  const [tabs, activeTab] = useMenuTabs();
  const MenuItem: React.FC<MenuTabItem> = ({ key, icon, to, title }) => (
    <Menu.Item className={style.optionWrapper} icon={icon} key={key}>
      <Link to={to}>{title}</Link>
    </Menu.Item>
  );

  return (
    <Menu className={style.toolbarWrapper} mode="inline" selectedKeys={activeTab} theme="dark">
      {tabs.map(MenuItem)}
    </Menu>
  );
};
