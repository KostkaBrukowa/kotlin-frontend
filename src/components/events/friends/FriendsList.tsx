import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { navigate } from '@reach/router';
import { List } from 'antd';

import { FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsFiendsRoute, eventsGroupRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { EmptyEventsList } from '../common/EmptyList';
import { getFriendCountText } from '../common/OtherParticipants';

import style from '../../utils/components/List.module.less';

export interface FriendsListProps {
  events?: FriendsPartyListType[];
  loading: boolean;
}
const ListItemMeta: React.FC<{
  party: FriendsPartyListType;
}> = ({ party: { partyParticipants, description, owner, id } }) => {
  const friendsCountText = getFriendCountText(partyParticipants.length - 1);

  return (
    <List.Item.Meta
      avatar={<IdenticonAvatar id={id} size={20} wrapperClassName={style.avatar} />}
      description={description}
      title={`Ty, ${owner?.name} ${friendsCountText ?? ''}`}
    />
  );
};

const ListItem: React.FC<{ item: FriendsPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} onClick={() => navigate(`${eventsFiendsRoute}/${item.id}`)}>
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
