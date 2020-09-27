import React from 'react';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { Button } from 'antd';

import { Info, ViewDescription } from '../../utils/components/ViewDescription';
import { dateFrom, formatDate } from '../../utils/functions/date';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './useSingleExpenseQuery';

import style from './ExpenseView.module.less';

export interface ExpenseInfoProps {
  expense: NotOptional<ExpenseQueryType>;
}

export const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ expense }) => (
  <>
    <ViewDescription>
      <Info description={expense.name} title="Nazwa" />
      <Info description={expense.expensePayer.name} title="Założyciel:" />
      <Info description={formatDate(dateFrom(expense.expenseDate))} title="Data założenia:" />
      <Info description={expense.description} title="Opis:" />
    </ViewDescription>
  </>
);
