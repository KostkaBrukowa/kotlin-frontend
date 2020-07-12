import { navigate } from '@reach/router';
import { List } from 'antd';
import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import { EmptyEventsList } from '../list-utils/EmptyList';
import style from '../../utils/list-utils/List.module.less';
import { getFriendCountText } from '../list-utils/OtherParticipants';

export interface FriendsListProps {
  events?: FriendsPartyListType[];
  loading: boolean;
}
const ListItemMeta: React.FC<{
  party: FriendsPartyListType;
}> = ({ party: { partyParticipants, description, owner } }) => {
  const friendsCountText = getFriendCountText(partyParticipants.length - 1);

  return (
    <List.Item.Meta
      avatar={<AiOutlineTeam className={style.avatar} />}
      description={description}
      title={`Ty, ${owner?.name} ${friendsCountText ?? ''}`}
    />
  );
};

const ListItem: React.FC<{ item: FriendsPartyListType }> = ({ item }) => (
  <List.Item
    className={style.listItem}
    onClick={() => {
      navigate(`/events/friends/${item.id}`);
    }}
  >
    <ListItemMeta party={item} />
  </List.Item>
);

export const FriendsList: React.FC<FriendsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    locale={{ emptyText: <EmptyEventsList type="znajomych" /> }}
    renderItem={(item: FriendsPartyListType) => <ListItem item={item} key={item.id} />}
    size="large"
  />
);
