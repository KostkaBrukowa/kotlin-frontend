import { List } from 'antd';
import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { GroupPartyListType, FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import style from '../events/EventsList.module.less';
import { CountableWordVariator } from '../../utils/functions/WordVariator';

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
  ownerName?: string | null;
  firstFriendName: string | null;
  friendsCount: number;
}> = ({ ownerName, firstFriendName, friendsCount }) => {
  const friendsCountText = getWordsCountText(friendsCount - 1);

  return (
    <List.Item.Meta
      avatar={<AiOutlineTeam className={style.avatar} />}
      description={`Zalożyciel: ${ownerName}`}
      title={`Ty, ${firstFriendName} ${friendsCountText}`}
    />
  );
};

const ListItem: React.FC<{ item: FriendsPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} key={item.id}>
    <ListItemMeta
      firstFriendName={item.partyParticipants[0]?.name ?? null}
      friendsCount={item.partyParticipants.length}
      ownerName={item.owner?.name}
    />
    {item.description}
  </List.Item>
);

export const FriendsList: React.FC<FriendsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    renderItem={(item: FriendsPartyListType) => <ListItem item={item} />}
    size="large"
  />
);
