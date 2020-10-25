import React, { useContext, useState } from 'react';
import { Button } from 'antd';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { NotOptional } from '../../utils/types';
import { shouldNotRenderConfirmPaymentsButton } from '../common/ExpenseActionButtonConditions';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ConfirmPaymentsButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const { userId } = useContext(UserContext);
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.InProgressPaying,
  });

  if (shouldNotRenderConfirmPaymentsButton(expense, userId)) {
    return null;
  }

  return (
    <Button size="small" onClick={openModal}>
      Potwierdź uczestników
    </Button>
  );
};
