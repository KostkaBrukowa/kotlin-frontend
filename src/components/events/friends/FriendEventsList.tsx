import React from 'react';
import { Link, navigate } from '@reach/router';
import { Button, List } from 'antd';

import { FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsFiendsRoute, friendsRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { EmptyEventsList } from '../common/EmptyList';
import { getFriendCountText } from '../common/OtherParticipants';

import style from '../../utils/components/List.module.less';

export interface FriendsListProps {
  friends?: FriendsPartyListType[];
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

export const FriendEventsList: React.FC<FriendsListProps> = ({ friends, loading }) => (
  <>
    <div className={style.addFriendWrapper}>
      <Button>
        <Link to={friendsRoute}>Dodaj znajomego</Link>
      </Button>
    </div>
    <List
      dataSource={friends}
      itemLayout="vertical"
      loading={loading || !friends}
      locale={{ emptyText: <EmptyEventsList type="znajomych" /> }}
      renderItem={(item: FriendsPartyListType) => <ListItem item={item} key={item.id} />}
      size="large"
    />
  </>
);
