import React, { useContext } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Button } from 'antd';

import { UserContext } from '../../config/UserProvider';
import { NotOptional } from '../../utils/types';
import { useRemoveExpense } from './graphql/useRemoveExpense';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';
import { useRemoveExpenseModal } from './useRemoveExpenseModal';

import style from './ExpenseView.module.less';

export interface RemoveExpenseButtonProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const RemoveExpenseButton: React.FC<RemoveExpenseButtonProps> = ({ expense }) => {
  const { userId } = useContext(UserContext);
  const openRemoveExpenseModal = useRemoveExpenseModal();

  return (
    <div className={style.buttonGroup}>
      {userId === expense.expensePayer.id && (
        <Button
          danger
          className={style.deleteButton}
          icon={<DeleteOutlined />}
          type="primary"
          onClick={() => openRemoveExpenseModal(expense.id)}
        >
          Usuń
        </Button>
      )}
    </div>
  );
};
