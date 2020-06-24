import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type EventsProps = RouteComponentProps;

export const Events: React.FC<EventsProps> = (props) => <p>Hello from events</p>;
