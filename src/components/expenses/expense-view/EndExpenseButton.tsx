import React, { useState } from 'react';
import { Button } from 'antd';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';

import style from './ExpenseView.module.less';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const EndExpenseButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.Resolved,
  });

  if (
    expense.expenseStatus !== ExpenseStatus.InProgressPaying ||
    expense.expensePayments.some(
      (it) => it.status !== PaymentStatus.Paid && it.status !== PaymentStatus.Declined,
    )
  ) {
    return null;
  }

  return (
    <>
      <div className={style.endExpenseButtonWrapper}>
        <Button size="large" type="primary" onClick={openModal}>
          Ukończ wydatek
        </Button>
      </div>
    </>
  );
};
