import { List } from 'antd';
import React from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { GroupPartyListType } from '../../mappers/events/PartyMapperTypes';
import style from '../events/EventsList.module.less';
import { ListItemMeta } from '../list-utils/ListItemMeta';

export interface GroupsListProps {
  events?: GroupPartyListType[];
  loading: boolean;
}

const ListItem: React.FC<{ item: GroupPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} key={item.id}>
    <ListItemMeta
      icon={<TiHomeOutline className={style.avatar} />}
      name={item.name}
      ownerName={item.owner?.name}
    />
    {item.description}
  </List.Item>
);

export const GroupsList: React.FC<GroupsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    renderItem={(item: GroupPartyListType) => <ListItem item={item} />}
    size="large"
  />
);
