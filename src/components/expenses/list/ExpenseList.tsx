import React, { useContext } from 'react';
import { OwsType } from '../../app-context/AppContext';
import { UserContext } from '../../config/UserProvider';
import {
  shouldNotRenderConfirmPaymentsButton,
  shouldNotRenderEndExpenseButton,
} from '../common/ExpenseActionButtonConditions';
import { finishedExpenseStatuses } from '../common/FinishedStatuses';
import { ExpensesQueryType } from '../useUserExpenses';
import { EmptyList } from './EmptyList';
import { ExpenseItemCard } from './ExpenseItemCard';
import { ExpenseTitle } from './ExpenseTitle';
import { LoadingCard } from './LoadingCard';

interface ExpenseListProps {
  expenses?: ExpensesQueryType['getExpensesForUser'];
  loading: boolean;
  showFinished: boolean;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, loading, showFinished }) => {
  const { userId } = useContext(UserContext);
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
      {filteredExpenses?.map((expense) => {
        const { amount, name, description, id, expenseStatus } = expense;
        const expenseWithExpensePayer = { ...expense, expensePayer: { id: userId ?? '0' } };

        return (
          <ExpenseItemCard
            amount={amount}
            description={description}
            expenseStatus={expenseStatus}
            highlight={
              !shouldNotRenderConfirmPaymentsButton(expenseWithExpensePayer, userId) ||
              !shouldNotRenderEndExpenseButton(expenseWithExpensePayer, userId)
            }
            id={id}
            key={id}
            name={name}
            owsType={OwsType.OWS_USER}
          />
        );
      })}
    </>
  );
};
