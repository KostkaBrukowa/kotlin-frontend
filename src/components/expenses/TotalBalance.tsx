import React from 'react';
import { Spin } from 'antd';

import { ExpenseStatus } from '../../generated/graphql';
import { OwsType } from '../app-context/AppContext';
import { AnimatedNumber } from '../utils/animations/AnimatedNumber';
import { currency } from '../utils/constants/currency';
import { finishedExpenseStatuses, finishedPaymentStatuses } from './common/FinishedStatuses';
import { OwsSection } from './OwsSection';
import { useUserExpenses } from './useUserExpenses';

import style from './TotalBalance.module.less';

export const TotalBalance: React.FC = () => {
  const { expenses, payments, loading } = useUserExpenses(true);
  const owsUserAmount =
    expenses
      ?.filter((it) => it.expenseStatus === ExpenseStatus.InProgressPaying)
      ?.reduce((acc, expense) => {
        const firstPaymentAmount =
          expense.expensePayments.find((it) => Boolean(it.amount))?.amount ?? 0;

        return acc + (expense.amount - firstPaymentAmount);
      }, 0) ?? 0;

  const userOwsAmount =
    payments
      ?.filter(
        (it) =>
          !finishedPaymentStatuses.includes(it.status) &&
          !finishedExpenseStatuses.includes(it.paymentExpense.expenseStatus),
      )
      ?.reduce((acc, payment) => acc + (payment?.amount ?? 0), 0) ?? 0;

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>
        Całkowity bilans: <AnimatedNumber amount={owsUserAmount - userOwsAmount} /> {currency}
        {loading && <Spin className={style.spin} />}
      </h3>

      <OwsSection amount={owsUserAmount} type={OwsType.OWS_USER} />
      <OwsSection amount={userOwsAmount} type={OwsType.USER_OWS} />
    </div>
  );
};
