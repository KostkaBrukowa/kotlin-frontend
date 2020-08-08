import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type HomeProps = RouteComponentProps;

export const Home: React.FC<HomeProps> = (props) => <p>Hello from home w</p>;
