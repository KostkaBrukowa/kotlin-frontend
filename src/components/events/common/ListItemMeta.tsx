import React from 'react';
import { List } from 'antd';

interface ListItemMetaProps {
  name: string;
  ownerName?: string | null;
  avatar: React.ReactNode;
}

export const ListItemMeta: React.FC<ListItemMetaProps> = ({ name, ownerName, avatar }) => (
  <List.Item.Meta
    avatar={avatar}
    description={ownerName ? `Założyciel: ${ownerName}` : null}
    title={name}
  />
);
