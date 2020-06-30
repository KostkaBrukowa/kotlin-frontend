import React from 'react';
import { ExpensesQueryType, useUserExpenses } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import { OwsType } from '../ExpensesContext';
import style from './ExpenseList.module.less';

interface ExpenseListProps {
  expenses?: ExpensesQueryType['getExpensesForUser'];
  loading: boolean;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, loading }) => {
  if (loading) {
    return <LoadingCard cardsCount={2} />;
  }

  if (!expenses) return null;

  if (expenses?.length === 0) {
    return <p>You have no expenses yet.</p>;
  }

  return (
    <>
      <h2 className={style.header}>Twoje wydatki:</h2>
      {expenses.slice(0, 2).map(({ amount, name, description, id, expenseStatus }) => (
        <ExpenseItemCard
          amount={amount}
          description={description}
          key={id}
          name={name}
          owsType={OwsType.OWS_USER}
          status={expenseStatus}
        />
      ))}
    </>
  );
};
