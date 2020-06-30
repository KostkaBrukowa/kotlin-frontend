import React from 'react';
import { ExpensesQueryType, PaymentsQueryType, useUserExpenses } from '../useUserExpenses';
import { ExpenseItemCard } from './ExpenseItemCard';
import { LoadingCard } from './LoadingCard';
import style from './ExpenseList.module.less';
import { OwsType } from '../ExpensesContext';

interface PaymentListProps {
  payments?: PaymentsQueryType['getClientsPayments'];
  loading: boolean;
}

export const PaymentList: React.FC<PaymentListProps> = ({ payments, loading }) => {
  if (loading) {
    return <LoadingCard />;
  }

  if (!payments) return null;

  if (payments?.length === 0) {
    return <p>You have no expenses yet.</p>;
  }

  return (
    <>
      <h2 className={style.header}>Twoje płatności:</h2>
      {payments.map(({ id, amount, status, paymentExpense: { name, description } }) => (
        <ExpenseItemCard
          amount={amount ?? 0}
          description={description}
          key={id}
          name={name}
          owsType={OwsType.OWS_USER}
          status={status}
        />
      ))}
    </>
  );
};
