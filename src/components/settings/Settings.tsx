import React from 'react';
import { RouteComponentProps } from '@reach/router';

export type SettingsProps = RouteComponentProps;

export const Settings: React.FC<SettingsProps> = (props) => <p>Hello from Settings</p>;
