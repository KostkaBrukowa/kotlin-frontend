import React, { useContext } from 'react';
import { Button } from 'antd';

import { ExpenseStatus } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { NotOptional } from '../../utils/types';
import { shouldNotRenderEndExpenseButton } from '../common/ExpenseActionButtonConditions';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';

import style from './ExpenseView.module.less';

export interface ConfirmPaymentsButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const EndExpenseButton: React.FC<ConfirmPaymentsButtonProps> = ({ expense }) => {
  const { userId } = useContext(UserContext);
  const openModal = useChangeExpenseStatusModal({
    expenseId: expense.id,
    expenseStatus: ExpenseStatus.Resolved,
  });

  if (shouldNotRenderEndExpenseButton(expense, userId)) {
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
