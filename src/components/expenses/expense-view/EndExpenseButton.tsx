import React, { useState } from 'react';
import { Button } from 'antd';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';

import style from './ExpenseView.module.less';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const EndExpenseButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const [confirmPaymentsModalOpen, setConfirmPaymentsModalOpen] = useState(false);
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.Resolved,
  });

  if (
    expense.expenseStatus !== ExpenseStatus.InProgressPaying ||
    expense.expensePayments.some((it) => it.status !== PaymentStatus.Confirmed)
  ) {
    return null;
  }

  return (
    <>
      <div className={style.endExpenseButtonWrapper}>
        <Button onClick={openModal} size={'large'} type={'primary'}>
          Ukończ wydatek
        </Button>
      </div>
    </>
  );
};
