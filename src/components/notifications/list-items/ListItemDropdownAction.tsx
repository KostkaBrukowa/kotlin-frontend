import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Dropdown, Menu, message } from 'antd';
import clsx from 'clsx';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

import { stopPropagation } from '../../utils/functions/utilFunctions';
import { useRemoveNotification } from './graphql/useRemoveNotification';

import style from '../Notifications.module.less';

const triggerButtonClassName = clsx(style.dropdownButton, 'data-cy-dropdown-trigger');

interface ListItemDropdownActionProps {
  notificationId: string;
}

export const ListItemDropdownAction: React.FC<ListItemDropdownActionProps> = ({
  notificationId,
}) => {
  const { removeNotification } = useRemoveNotification(notificationId);
  const handleDeleteMenuItemClick: MenuClickEventHandler = async (info) => {
    info.domEvent.stopPropagation();
    try {
      await removeNotification();
      message.success('Usunięto powiadomienie');
    } catch {}
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
