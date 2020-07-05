import { FiMapPin } from 'react-icons/fi';
import { MdEvent } from 'react-icons/md';
import { Divider, List } from 'antd';
import React from 'react';
import { Link } from '@reach/router';
import { EventPartyListType } from '../../mappers/events/PartyMapperTypes';
import style from './EventsList.module.less';
import { ListItemMeta } from '../list-utils/ListItemMeta';

export interface EventsListProps {
  events?: EventPartyListType[];
  loading: boolean;
}

const ListItemFooter: React.FC<{ locationName: string }> = ({ locationName }) => (
  <div className={style.itemFooter}>
    <p>Miejsce: {locationName}</p>
    <div>
      <Link to="/">Zobacz na mapie</Link>
      <FiMapPin className={style.picture} />
    </div>
  </div>
);

const ListItem: React.FC<{ item: EventPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} key={item.id}>
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
    renderItem={(item: EventPartyListType) => <ListItem item={item} />}
    size="large"
  />
);
