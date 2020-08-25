import React from 'react';
import { navigate } from '@reach/router';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './useSingleExpenseQuery';

import style from './ExpenseView.module.less';

const participantWrapperClassName = clsx(style.participantWrapper, 'data-cy-participant-wrapper');

export interface ExpenseParticipantsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
}

export const ExpenseParticipants: React.FC<ExpenseParticipantsProps> = ({ payments }) => (
  <div className={style.participantsWrapper}>
    {payments.map(({ paymentPayer }) => (
      <div
        className={participantWrapperClassName}
        key={paymentPayer.id}
        onClick={() => navigate(`/users/${paymentPayer.id}`)}
      >
        <IdenticonAvatar id={paymentPayer.id} size={20} />
        {paymentPayer.name}
      </div>
    ))}
  </div>
);
