import React from 'react';
import { Link, navigate } from '@reach/router';
import { Menu } from 'antd';
import clsx from 'clsx';

import { handleSpaceAndEnter } from '../utils/a11n/KeyHandlers';
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
    <div className={menuClassName}>
      {tabs.map(({ key, icon, to, title }) => {
        const handleClick = () => navigate(to);

        return (
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
        );
      })}
    </div>
  );
};
