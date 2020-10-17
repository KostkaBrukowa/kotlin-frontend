import React from 'react';

import { ParticipantList } from '../../common/participant-list/ParticipantList';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';

export interface ExpenseParticipantsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
}

export const ExpenseParticipants: React.FC<ExpenseParticipantsProps> = ({ payments }) => (
  <ParticipantList participants={payments.map((it) => it.paymentPayer)} />
);
