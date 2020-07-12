import React, { ReactNode } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import clsx from 'clsx';

import { ListItemDropdownAction } from './ListItemDropdownAction';
import listStyle from '../../utils/list-utils/List.module.less';
import style from '../Notifications.module.less';
import { formatDate } from '../../utils/functions/date';

export interface ListItemProps {
  date: Date;
  title: string;
  avatarIcon: ReactNode;

  onRemove(): void;
  onClick?(): void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  date,
  avatarIcon,
  onClick,
  onRemove,
}) => (
  <List.Item
    actions={[<ListItemDropdownAction onRemove={onRemove} />]}
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
