import React from 'react';

import { PaymentStatus } from '../../../generated/graphql';
import { OwsType } from '../../app-context/AppContext';
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

const finishedPaymentStatuses: PaymentStatus[] = [
  PaymentStatus.Confirmed,
  PaymentStatus.Declined,
  PaymentStatus.Bulked,
];

export const PaymentList: React.FC<PaymentListProps> = ({ payments, loading, showFinished }) => {
  const filteredExpenses = payments?.filter(
    (it) => showFinished || !finishedPaymentStatuses.includes(it.status),
  );

  if (loading) {
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
      {filteredExpenses?.map(({ id, amount, status, paymentExpense: { name, description } }) => (
        <ExpenseItemCard
          amount={amount ?? null}
          description={description}
          id={id}
          key={id}
          name={name}
          owsType={OwsType.USER_OWS}
          status={status}
        />
      ))}
    </>
  );
};
