import React from 'react';
import { ExpensesQueryType } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import { OwsType } from '../ExpensesContext';
import { ExpenseTitle } from './ExpenseTitle';
import { ExpenseStatus } from '../../../generated/graphql';

interface ExpenseListProps {
  expenses?: ExpensesQueryType['getExpensesForUser'];
  loading: boolean;
  showFinished: boolean;
}

const finishedExpenseStatuses: ExpenseStatus[] = [ExpenseStatus.Resolved, ExpenseStatus.Declined];

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, loading, showFinished }) => {
  if (loading) {
    return <LoadingCard cardsCount={2} />;
  }

  if (!expenses) return null;

  if (expenses?.length === 0) {
    return <p>You have no expenses yet.</p>;
  }

  return (
    <>
      <ExpenseTitle title="Twoje wydatki:" />
      {expenses
        .filter((it) => showFinished || !finishedExpenseStatuses.includes(it.expenseStatus))
        .map(({ amount, name, description, id, expenseStatus }) => (
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
