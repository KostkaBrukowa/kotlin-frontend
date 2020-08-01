import React from 'react';
import { navigate } from '@reach/router';
import style from './ExpenseView.module.less';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './useSingleExpenseQuery';

export interface ExpenseParticipantsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
}

export const ExpenseParticipants: React.FC<ExpenseParticipantsProps> = ({ payments }) => (
  <div className={style.participantsWrapper}>
    {payments.map(({ paymentPayer }) => (
      <div
        className={style.participantWrapper}
        onClick={() => navigate(`/users/${paymentPayer.id}`)}
      >
        <IdenticonAvatar id={paymentPayer.id} size={20} />
        {paymentPayer.name}
      </div>
    ))}
  </div>
);
