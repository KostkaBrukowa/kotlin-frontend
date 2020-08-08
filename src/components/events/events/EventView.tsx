import React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './EventView.module.less';
// @ts-ignore
import { SimpleExample } from './EventLeafletMap';

interface RouteParams {
  eventId?: string;
}

export type EventViewProps = RouteComponentProps<RouteParams>;

export const EventView: React.FC<EventViewProps> = ({ eventId }) => {
  console.log('EventId', eventId);

  return (
    <div>
      <SimpleExample />
    </div>
  );
};
