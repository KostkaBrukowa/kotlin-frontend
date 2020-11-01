import React from 'react';
import { navigate } from '@reach/router';
import { List } from 'antd';

import { GroupPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsGroupRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { useListGridProps } from '../../utils/components/useListGridProps';
import { EmptyEventsList } from '../common/EmptyList';
import { getFriendCountText } from '../common/OtherParticipants';

import style from '../../utils/components/List.module.less';

export interface GroupsListProps {
  events?: GroupPartyListType[];
  loading: boolean;
}

const ListItem: React.FC<{ item: GroupPartyListType }> = ({ item }) => {
  const friendsCountText = getFriendCountText(item.partyParticipants.length - 2);

  return (
    <List.Item
      className={style.listItem}
      onClick={() => navigate(`${eventsGroupRoute}/${item.id}`)}
    >
      <List.Item.Meta
        avatar={<IdenticonAvatar id={item.id} size={20} wrapperClassName={style.avatar} />}
        description={`Ty, ${item.partyParticipants[0]?.name} ${friendsCountText ?? ''}`}
        title={item.name}
      />
      {item.description}
    </List.Item>
  );
};

export const GroupsList: React.FC<GroupsListProps> = ({ events, loading }) => {
  const grid = useListGridProps();

  return (
    <List
      dataSource={events}
      grid={grid}
      itemLayout="vertical"
      loading={loading && !events}
      locale={{ emptyText: <EmptyEventsList type="grup" /> }}
      renderItem={(item: GroupPartyListType) => <ListItem item={item} key={item.id} />}
      size="large"
    />
  );
};
