import React from 'react';
import { ExpensesQueryType } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import { OwsType } from '../../app-context/AppContext';
import { ExpenseTitle } from './ExpenseTitle';
import { ExpenseStatus } from '../../../generated/graphql';
import { EmptyList } from './EmptyList';

interface ExpenseListProps {
  expenses?: ExpensesQueryType['getExpensesForUser'];
  loading: boolean;
  showFinished: boolean;
}

const finishedExpenseStatuses: ExpenseStatus[] = [ExpenseStatus.Resolved, ExpenseStatus.Declined];

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, loading, showFinished }) => {
  const filteredExpenses = expenses?.filter(
    (it) => showFinished || !finishedExpenseStatuses.includes(it.expenseStatus),
  );

  if (loading) {
    return <LoadingCard cardsCount={2} />;
  }

  if (!expenses) return null;

  if (filteredExpenses?.length === 0) {
    return <EmptyList nonFinishedPresent={expenses.length !== 0} />;
  }

  return (
    <>
      <ExpenseTitle title="Twoje wydatki:" />
      {filteredExpenses?.map(({ amount, name, description, id, expenseStatus }) => (
        <ExpenseItemCard
          amount={amount}
          description={description}
          id={id}
          key={id}
          name={name}
          owsType={OwsType.OWS_USER}
          status={expenseStatus}
        />
      ))}
    </>
  );
};
