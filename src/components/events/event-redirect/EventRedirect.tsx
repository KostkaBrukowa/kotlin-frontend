import React, { useEffect } from 'react';
import { navigate, Redirect, RouteComponentProps } from '@reach/router';

import { useSingleEvent } from '../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { eventTypeToRoute } from '../common/Route';

interface RouteProps {
  eventId: string;
}
export type EventRedirectProps = RouteComponentProps<RouteProps>;

export const EventRedirect: React.FC<EventRedirectProps> = ({ eventId }) => {
  const { dataComponent, extractedData: event } = useSingleEvent(eventId);

  useEffect(() => {
    if (event?.type) {
      navigate(`${eventTypeToRoute(event.type)}/${eventId}`);
    }
  }, [event, eventId]);

  if ((dataComponent !== null && !event) || !event) return dataComponent;

  return null;
};
