import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MdEvent } from 'react-icons/md';
import { navigate } from '@reach/router';
import { Button, Divider, List } from 'antd';

import { EventPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsRoute } from '../../navigation/routerConstants';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { EmptyEventsList } from '../list-utils/EmptyList';
import { ListItemMeta } from '../list-utils/ListItemMeta';

import style from '../../utils/list-utils/List.module.less';

export interface EventsListProps {
  events?: EventPartyListType[];
  loading: boolean;
}

const ListItemFooter: React.FC<{ locationName: string }> = ({ locationName }) => (
  <div className={style.itemFooter}>
    <p>Miejsce: {locationName}</p>
    <div>
      <Button icon={<FiMapPin className={style.picture} />} onClick={stopPropagation}>
        Zobacz na mapie
      </Button>
    </div>
  </div>
);

const ListItem: React.FC<{ item: EventPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} onClick={() => navigate(`${eventsRoute}/${item.id}`)}>
    <ListItemMeta
      icon={<MdEvent className={style.avatar} />}
      name={item.name}
      ownerName={item.owner?.name}
    />
    {item.description}
    <Divider className={style.divider} />
    <ListItemFooter locationName={item.locationName} />
  </List.Item>
);

export const EventsList: React.FC<EventsListProps> = ({ events, loading }) => (
  <List
    dataSource={events}
    itemLayout="vertical"
    loading={loading || !events}
    locale={{ emptyText: <EmptyEventsList type="wydarzeń" /> }}
    renderItem={(item: EventPartyListType) => <ListItem item={item} key={item.id} />}
    size="large"
  />
);
