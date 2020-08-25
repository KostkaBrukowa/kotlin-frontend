import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Dropdown, Menu } from 'antd';
import clsx from 'clsx';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

import { stopPropagation } from '../../utils/functions/utilFunctions';

import style from '../Notifications.module.less';

const triggerButtonClassName = clsx(style.dropdownButton, 'data-cy-dropdown-trigger');

interface ListItemDropdownActionProps {
  onRemove(): void;
}

export const ListItemDropdownAction: React.FC<ListItemDropdownActionProps> = ({ onRemove }) => {
  const handleDeleteMenuItemClick: MenuClickEventHandler = (info) => {
    info.domEvent.stopPropagation();
    onRemove();
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleDeleteMenuItemClick}>
        Usuń powiadomienie
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        className={triggerButtonClassName}
        icon={<BsThreeDotsVertical size="1.3em" />}
        type="ghost"
        onClick={stopPropagation}
      />
    </Dropdown>
  );
};
