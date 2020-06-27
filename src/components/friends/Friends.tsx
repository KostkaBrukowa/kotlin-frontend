import React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './Friends.module.less';
import { TotalBalance } from './TotalBalance';

export type FriendsProps = RouteComponentProps;

export const Friends: React.FC<FriendsProps> = (props) => (
  <section className={style.wrapper}>
    <TotalBalance />
  </section>
);
