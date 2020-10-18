import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'antd';
import clsx from 'clsx';

import { useMenuTabs } from './useAppNavigation';

import style from './Toolbar.module.less';

const menuItemClassName = (title: string, active: boolean) =>
  clsx(`data-cy-${title}`, style.optionWrapper, {
    [style.activeOptionWrapper]: active,
  });
const menuClassName = clsx('data-cy-toolbar', style.toolbarWrapper);

export const Toolbar: React.FC = () => {
  const [tabs, activeTab] = useMenuTabs();

  return (
    <Menu className={menuClassName} mode="inline" selectedKeys={activeTab} theme="dark">
      {tabs.map(({ key, icon, to, title }) => (
        <Menu.Item className={menuItemClassName(title, key === activeTab[0])} icon={icon} key={key}>
          <Link to={to}>{title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
