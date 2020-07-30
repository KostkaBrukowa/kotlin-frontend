import React from 'react';
import style from './ExpenseView.module.less';
import { dateFrom, formatDate } from '../../utils/functions/date';
import { ExpenseQueryType } from './useSingleExpenseQuery';

export interface InfoProps {
  title: string;
  description?: string | null;
}

export interface ExpenseInfoProps {
  expense: Exclude<ExpenseQueryType, null | undefined>;
}

export const Info: React.FC<InfoProps> = ({ title, description }) => (
  <>
    <p className={style.descriptionLabel}>{title}</p>
    <p>{description}</p>
  </>
);

export const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ expense }) => (
  <>
    <div className={style.description}>
      <Info description={expense.name} title="Nazwa" />
      <Info description={expense.expensePayer.name} title="Założyciel:" />
      <Info description={formatDate(dateFrom(expense.expenseDate))} title="Data założenia:" />
      <Info description={expense.description} title="Opis:" />
    </div>
  </>
);
