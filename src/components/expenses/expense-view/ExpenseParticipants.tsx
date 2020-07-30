import React from 'react';
import { navigate } from '@reach/router';
import { Collapse } from 'antd';
import style from './ExpenseView.module.less';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';

export interface ExpenseParticipantsProps {}

export const ExpenseParticipants: React.FC<ExpenseParticipantsProps> = ({}) => (
  <div className={style.participantsWrapper}>
    {[1, 2, 3, 4, 6].map((i) => (
      <div className={style.participantWrapper} onClick={() => navigate(`/users/${i}`)}>
        <IdenticonAvatar id={`${i}`} size={20} />
        Michalina Komarzyk
      </div>
    ))}
  </div>
);
