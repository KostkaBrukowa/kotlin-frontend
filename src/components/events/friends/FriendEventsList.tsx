import React, { useContext } from 'react';
import { Link, navigate } from '@reach/router';
import { Button, List } from 'antd';

import { UserContext } from '../../config/UserProvider';
import { FriendsPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsFriendsRoute, friendsRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { useListGridProps } from '../../utils/components/useListGridProps';
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
  const { userId } = useContext(UserContext);
  const friendsCountText = getFriendCountText(partyParticipants.length - 2);
  const firstParticipant = userId === owner?.id ? partyParticipants[0] : owner;

  return (
    <List.Item.Meta
      avatar={<IdenticonAvatar id={id} size={20} wrapperClassName={style.avatar} />}
      description={description}
      title={`Ty, ${firstParticipant?.name} ${friendsCountText ?? ''}`}
    />
  );
};

const ListItem: React.FC<{ item: FriendsPartyListType }> = ({ item }) => (
  <List.Item
    className={style.listItem}
    onClick={() => navigate(`${eventsFriendsRoute}/${item.id}`)}
  >
    <ListItemMeta party={item} />
  </List.Item>
);

export const FriendEventsList: React.FC<FriendsListProps> = ({ friends, loading }) => {
  const grid = useListGridProps();

  return (
    <>
      <div className={style.addFriendWrapper}>
        <Button>
          <Link to={friendsRoute}>Dodaj znajomego</Link>
        </Button>
      </div>
      <List
        dataSource={friends}
        grid={grid}
        itemLayout="vertical"
        loading={loading && !friends}
        locale={{ emptyText: <EmptyEventsList type="znajomych" /> }}
        renderItem={(item: FriendsPartyListType) => <ListItem item={item} key={item.id} />}
        size="large"
      />
    </>
  );
};
