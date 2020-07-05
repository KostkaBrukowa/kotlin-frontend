import React from 'react';
import { List } from 'antd';

interface ListItemMetaProps {
  name: string;
  ownerName?: string | null;
  icon: React.ReactNode;
}

export const ListItemMeta: React.FC<ListItemMetaProps> = ({ name, ownerName, icon }) => (
  <List.Item.Meta avatar={icon} description={`Zalożyciel: ${ownerName}`} title={name} />
);
