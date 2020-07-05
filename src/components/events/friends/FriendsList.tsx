import { List } from 'antd';
import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { navigate } from '@reach/router';
import { FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import style from '../events/EventsList.module.less';
import { CountableWordVariator } from '../../utils/functions/WordVariator';
import { EmptyEventsList } from '../list-utils/EmptyList';

export interface FriendsListProps {
  events?: FriendsPartyListType[];
  loading: boolean;
}

const differentLabel = new CountableWordVariator({
  singular: 'inny',
  betweenTwoAndFour: 'innych',
  plural: 'innych',
});

const getWordsCountText = (wordsCount: number): string | null =>
  wordsCount >= 1 ? ` i ${wordsCount} ${differentLabel.forCount(wordsCount)}` : null;

const ListItemMeta: React.FC<{
  party: FriendsPartyListType;
}> = ({ party: { partyParticipants, description, owner } }) => {
  const friendsCountText = getWordsCountText(partyParticipants.length - 1);

  return (
    <List.Item.Meta
      avatar={<AiOutlineTeam className={style.avatar} />}
      description={description}
      title={`Ty, ${owner?.name} ${friendsCountText}`}
    />
  );
};

const ListItem: React.FC<{ item: FriendsPartyListType }> = ({ item }) => (
  <List.Item
    className={style.listItem}
    key={item.id}
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
    renderItem={(item: FriendsPartyListType) => <ListItem item={item} />}
    size="large"
  />
);
