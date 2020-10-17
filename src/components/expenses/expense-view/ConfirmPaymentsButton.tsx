import React, { useState } from 'react';
import { Button } from 'antd';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ConfirmPaymentsButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const [confirmPaymentsModalOpen, setConfirmPaymentsModalOpen] = useState(false);
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.InProgressPaying,
  });

  if (
    expense.expenseStatus !== ExpenseStatus.InProgressPaying ||
    expense.expensePayments.some(
      (it) => it.status !== PaymentStatus.Accepted && it.status !== PaymentStatus.Declined,
    )
  ) {
    return null;
  }

  return (
    <Button onClick={openModal} size={'small'}>
      Potwierdź uczestników
    </Button>
  );
};
