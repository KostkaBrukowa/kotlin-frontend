import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type FriendsProps = RouteComponentProps;

export const Friends: React.FC<FriendsProps> = (props) => <p>Hello from Friends</p>;
