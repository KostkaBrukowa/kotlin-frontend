import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { navigate } from '@reach/router';
import { Modal } from 'antd';

import { expensesRoute } from '../../navigation/routerConstants';
import { useRemoveExpense } from './graphql/useRemoveExpense';

export const useRemoveExpenseModal = () => {
  const { removeExpense } = useRemoveExpense();

  return (expenseId: string) => {
    Modal.confirm({
      maskClosable: true,
      title: 'Usuwasz wydatek.',
      icon: <ExclamationCircleOutlined />,
      content: 'Czy na pewno chcesz usunąć ten wydatek? Nie będzie można go później przywrócić',
      onOk: async () => {
        await removeExpense(expenseId);
        await navigate(`${expensesRoute}`);
      },
    });
  };
};
