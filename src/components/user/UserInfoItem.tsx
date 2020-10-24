import React from 'react';
import { Divider } from 'antd';

import { Optional } from '../utils/types';

import style from './UserInfoItem.module.less';

export interface UserInfoItemProps {
  title: string;
  value?: Optional<string>;
}

export const UserInfoItem: React.FC<UserInfoItemProps> = ({ value, title }) => (
  <>
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <p className={style.value}>{value ?? '-'}</p>
    </div>
    <Divider className={style.divider} />
  </>
);
