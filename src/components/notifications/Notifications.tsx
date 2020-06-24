import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type NotificationsProps = RouteComponentProps;

export const Notifications: React.FC<NotificationsProps> = (props) => (
  <p>Hello from Notifications</p>
);
