import React, { MouseEvent } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MdEvent } from 'react-icons/md';
import { navigate } from '@reach/router';
import { Button, Divider, List } from 'antd';

import { EventPartyListType } from '../../mappers/events/PartyMapperTypes';
import { eventsEventRoute, eventsRoute } from '../../navigation/routerConstants';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { EmptyEventsList } from '../common/EmptyList';
import { ListItemMeta } from '../common/ListItemMeta';

import style from '../../utils/components/List.module.less';

export interface EventsListProps {
  events?: EventPartyListType[];
  loading: boolean;
}

const ListItemFooter: React.FC<{ locationName: string; id: string }> = ({ locationName, id }) => {
  const handleClick = (e: MouseEvent<unknown>) => {
    e.stopPropagation();
    navigate(`${eventsEventRoute}/${id}#mapOpen`);
  };

  return (
    <div className={style.itemFooter}>
      <p>Miejsce: {locationName}</p>
      <div>
        <Button icon={<FiMapPin className={style.picture} />} onClick={handleClick}>
          Zobacz na mapie
        </Button>
      </div>
    </div>
  );
};

const ListItem: React.FC<{ item: EventPartyListType }> = ({ item }) => (
  <List.Item className={style.listItem} onClick={() => navigate(`${eventsEventRoute}/${item.id}`)}>
    <ListItemMeta
      icon={<MdEvent className={style.avatar} />}
      name={item.name}
      ownerName={item.owner?.name}
    />
    {item.description}
    <Divider className={style.divider} />
    <ListItemFooter id={item.id} locationName={item.locationName} />
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
