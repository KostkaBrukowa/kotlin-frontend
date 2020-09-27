import React from 'react';
import { navigate } from '@reach/router';
import { Row, Statistic } from 'antd';

import { ElementHeader } from '../../common/element-header/ElementHeader';
import { renderExpenseStatus } from '../../enum-renderers/expenseStatusRenderer';
import { expenseFormRoute } from '../../navigation/routerConstants';
import { currency } from '../../utils/constants/currency';
import { NotOptional } from '../../utils/types';
import { ExpenseInfo } from './ExpenseInfo';
import { ExpenseQueryType } from './useSingleExpenseQuery';

import style from './ExpenseView.module.less';

export interface ExpenseDetailsProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense }) => (
  <div className={style.wrapper}>
    <ElementHeader id={expense.id} onEdit={() => navigate(`${expenseFormRoute}/${expense.id}`)} />
    <Row justify="space-between">
      <Statistic title="Status" value={renderExpenseStatus(expense.expenseStatus)} />
      <Statistic suffix={currency} title="Koszt wydatku" value={expense.amount} />
    </Row>
    <ExpenseInfo expense={expense} />
  </div>
);
