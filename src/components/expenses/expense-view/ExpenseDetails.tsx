import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { Row, Statistic } from 'antd';

import { ElementHeader } from '../../common/element-header/ElementHeader';
import { UserContext } from '../../config/UserProvider';
import { renderExpenseStatus } from '../../enum-renderers/expenseStatusRenderer';
import { expenseFormRoute } from '../../navigation/routerConstants';
import { currency } from '../../utils/constants/currency';
import { NotOptional } from '../../utils/types';
import { finishedExpenseStatuses } from '../common/FinishedStatuses';
import { ExpenseInfo } from './ExpenseInfo';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';

import style from './ExpenseView.module.less';

export interface ExpenseDetailsProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense }) => {
  const { userId } = useContext(UserContext);
  const handleEdit = (): void => {
    navigate(`${expenseFormRoute}/${expense.id}`);
  };
  const isEditable =
    !finishedExpenseStatuses.includes(expense.expenseStatus) && userId === expense.expensePayer.id;

  return (
    <div className={style.wrapper}>
      <ElementHeader id={expense.id} onEdit={isEditable ? handleEdit : undefined} />
      <Row justify="space-between">
        <Statistic title="Status" value={renderExpenseStatus(expense.expenseStatus)} />
        <Statistic suffix={currency} title="Koszt wydatku" value={expense.amount} />
      </Row>
      <ExpenseInfo expense={expense} />
    </div>
  );
};
