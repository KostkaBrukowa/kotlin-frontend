import { List } from 'antd';
import React from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { GroupPartyListType } from '../../mappers/events/PartyMapperTypes';
import style from '../events/EventsList.module.less';
import { getFriendCountText } from '../list-utils/OtherParticipants';
import { EmptyEventsList } from '../list-utils/EmptyList';

export interface GroupsListProps {
  events?: GroupPartyListType[];
  loading: boolean;
}

const ListItem: React.FC<{ item: GroupPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} key={item.id}>
    <List.Item.Meta
      avatar={<TiHomeOutline className={style.avatar} />}
      description={`Ty, ${item.partyParticipants[0]?.name} ${getFriendCountText(
        item.partyParticipants.length,
      )}`}
      title={item.name}
    />
    {item.description}
  </List.Item>
);

export const GroupsList: React.FC<GroupsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    locale={{ emptyText: <EmptyEventsList type="grup" /> }}
    renderItem={(item: GroupPartyListType) => <ListItem item={item} />}
    size="large"
  />
);
