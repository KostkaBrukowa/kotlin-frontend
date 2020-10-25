import React, { useState } from 'react';
import { Button } from 'antd';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ConfirmPaymentsButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.InProgressPaying,
  });

  if (
    expense.expenseStatus !== ExpenseStatus.InProgressRequesting ||
    expense.expensePayments.some(
      (it) => it.status !== PaymentStatus.Accepted && it.status !== PaymentStatus.Declined,
    )
  ) {
    return null;
  }

  return (
    <Button size="small" onClick={openModal}>
      Potwierdź uczestników
    </Button>
  );
};
