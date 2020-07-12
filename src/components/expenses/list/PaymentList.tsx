import React from 'react';
import { PaymentsQueryType } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import { OwsType } from '../../app-context/AppContext';
import { ExpenseTitle } from './ExpenseTitle';
import { PaymentStatus } from '../../../generated/graphql';
import { EmptyList } from './EmptyList';

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
  if (loading) {
    return <LoadingCard />;
  }

  if (!payments) {
    return null;
  }

  if (payments?.length === 0) {
    return <EmptyList nonFinishedPresent={payments.length !== 0} />;
  }

  return (
    <>
      <ExpenseTitle title="Twoje płatności:" />
      {payments
        .filter((it) => showFinished || !finishedPaymentStatuses.includes(it.status))
        .map(({ id, amount, status, paymentExpense: { name, description } }) => (
          <ExpenseItemCard
            amount={amount ?? null}
            description={description}
            key={id}
            name={name}
            owsType={OwsType.USER_OWS}
            status={status}
          />
        ))}
    </>
  );
};
