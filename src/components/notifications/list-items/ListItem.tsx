import React, { ReactNode } from 'react';
import { Avatar, Badge, List, Skeleton } from 'antd';
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
  isRead?: boolean;

  onClick?(): void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  date,
  avatarIcon,
  onClick,
  notificationId,
  isRead,
}) => (
  <List.Item
    actions={[<ListItemDropdownAction notificationId={notificationId} />]}
    className={clsx(listStyle.listItem, style.listItem)}
    onClick={onClick}
  >
    <Skeleton avatar loading={false}>
      <List.Item.Meta
        avatar={
          <Badge dot={!isRead} offset={[0, 3]}>
            <Avatar className={style.avatar} icon={avatarIcon} shape="square" />
          </Badge>
        }
        description={formatDate(date)}
        title={title}
      />
    </Skeleton>
  </List.Item>
);
