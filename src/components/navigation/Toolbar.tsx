import React from 'react';
import { Menu } from 'antd';
import { Link } from '@reach/router';
import clsx from 'clsx';
import { MenuTabItem, useMenuTabs } from './useAppNavigation';
import style from './Toolbar.module.less';

const menuItemClassName = (title: string) => clsx(`data-cy-${title}`, style.optionWrapper);
const menuClassName = clsx('data-cy-toolbar', style.toolbarWrapper);

const MenuItem: React.FC<MenuTabItem> = ({ key, icon, to, title }) => (
  <Menu.Item className={menuItemClassName(title)} icon={icon} key={key}>
    <Link to={to}>{title}</Link>
  </Menu.Item>
);

export const Toolbar: React.FC = () => {
  const [tabs, activeTab] = useMenuTabs();

  return (
    <Menu className={menuClassName} mode="inline" selectedKeys={activeTab} theme="dark">
      {tabs.map(MenuItem)}
    </Menu>
  );
};
