import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { capitalize } from '../../utils/functions/string';
import { EventMap } from './EventLeafletMap';
import { useSingleEvent } from './useSingleEvent';

import style from './EventView.module.less';

interface RouteParams {
  eventId?: string;
}

export type EventViewProps = RouteComponentProps<RouteParams>;

export const EventView: React.FC<EventViewProps> = ({ eventId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(eventId);

  if (dataComponent !== null || !event) return dataComponent ?? null;

  return (
    <div>
      <EventMap x="1" />
      <div className={style.infoWrapper}>
        <h2>{capitalize(event.name)}</h2>
      </div>
    </div>
  );
};
