import React from 'react';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { OwsType } from '../../app-context/AppContext';
import { finishedExpenseStatuses, finishedPaymentStatuses } from '../common/FinishedStatuses';
import { PaymentsQueryType } from '../useUserExpenses';
import { EmptyList } from './EmptyList';
import { ExpenseItemCard } from './ExpenseItemCard';
import { ExpenseTitle } from './ExpenseTitle';
import { LoadingCard } from './LoadingCard';

interface PaymentListProps {
  payments?: PaymentsQueryType['getClientsPayments'];
  loading: boolean;
  showFinished: boolean;
}

export const PaymentList: React.FC<PaymentListProps> = ({ payments, loading, showFinished }) => {
  const filteredExpenses = payments?.filter(
    (it) =>
      showFinished ||
      (!finishedPaymentStatuses.includes(it.status) &&
        !finishedExpenseStatuses.includes(it.paymentExpense.expenseStatus)),
  );

  if (loading && !payments) {
    return <LoadingCard />;
  }

  if (!payments) {
    return null;
  }

  if (filteredExpenses?.length === 0) {
    return <EmptyList nonFinishedPresent={payments.length !== 0} />;
  }

  return (
    <>
      <ExpenseTitle title="Twoje płatności:" />
      {filteredExpenses?.map(
        ({ id, amount, status, paymentExpense: { name, description, expenseStatus } }) => (
          <ExpenseItemCard
            amount={amount ?? null}
            description={description}
            expenseStatus={expenseStatus}
            highlight={
              (status === PaymentStatus.InProgress &&
                expenseStatus === ExpenseStatus.InProgressRequesting) ||
              (status === PaymentStatus.Accepted &&
                expenseStatus === ExpenseStatus.InProgressPaying)
            }
            id={id}
            key={id}
            name={name}
            owsType={OwsType.USER_OWS}
            paymentStatus={status}
          />
        ),
      )}
    </>
  );
};
