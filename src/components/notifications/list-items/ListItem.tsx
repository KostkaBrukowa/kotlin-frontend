import React, { ReactNode } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import clsx from 'clsx';

import { formatDate } from '../../utils/functions/date';
import { ListItemDropdownAction } from './ListItemDropdownAction';

import listStyle from '../../utils/components/List.module.less';
import style from '../Notifications.module.less';

export interface ListItemProps {
  date: Date;
  title: string;
  avatarIcon: ReactNode;
  notificationId: string;

  onClick?(): void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  date,
  avatarIcon,
  onClick,
  notificationId,
}) => (
  <List.Item
    actions={[<ListItemDropdownAction notificationId={notificationId} />]}
    className={clsx(listStyle.listItem, style.listItem)}
    onClick={onClick}
  >
    <Skeleton avatar loading={false}>
      <List.Item.Meta
        avatar={<Avatar className={style.avatar} icon={avatarIcon} shape="square" />}
        description={formatDate(date)}
        title={title}
      />
    </Skeleton>
  </List.Item>
);
