import React from 'react';
import { PaymentsQueryType } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import { OwsType } from '../ExpensesContext';
import { ExpenseTitle } from './ExpenseTitle';
import { PaymentStatus } from '../../../generated/graphql';

interface PaymentListProps {
  payments?: PaymentsQueryType['getClientsPayments'];
  loading: boolean;
  showFinished: boolean;
}

const finishedPaymentStatuses: PaymentStatus[] = [PaymentStatus.Confirmed, PaymentStatus.Declined];

export const PaymentList: React.FC<PaymentListProps> = ({ payments, loading, showFinished }) => {
  if (loading) {
    return <LoadingCard />;
  }

  if (!payments) return null;

  if (payments?.length === 0) {
    return <p>You have no expenses yet.</p>;
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
