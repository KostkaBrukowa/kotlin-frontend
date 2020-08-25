import React from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { List } from 'antd';

import { GroupPartyListType } from '../../mappers/events/PartyMapperTypes';
import { EmptyEventsList } from '../list-utils/EmptyList';
import { getFriendCountText } from '../list-utils/OtherParticipants';

import style from '../../utils/list-utils/List.module.less';

export interface GroupsListProps {
  events?: GroupPartyListType[];
  loading: boolean;
}

const ListItem: React.FC<{ item: GroupPartyListType }> = ({ item }) => {
  const friendsCountText = getFriendCountText(item.partyParticipants.length - 1);

  return (
    <List.Item className={style.listItem}>
      <List.Item.Meta
        avatar={<TiHomeOutline className={style.avatar} />}
        description={`Ty, ${item.partyParticipants[0]?.name} ${friendsCountText ?? ''}`}
        title={item.name}
      />
      {item.description}
    </List.Item>
  );
};

export const GroupsList: React.FC<GroupsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    locale={{ emptyText: <EmptyEventsList type="grup" /> }}
    renderItem={(item: GroupPartyListType) => <ListItem item={item} key={item.id} />}
    size="large"
  />
);
