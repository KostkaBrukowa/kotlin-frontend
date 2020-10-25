import React from 'react';
import { Spin } from 'antd';

import { OwsType } from '../app-context/AppContext';
import { AnimatedNumber } from '../utils/animations/AnimatedNumber';
import { currency } from '../utils/constants/currency';
import { finishedExpenseStatuses, finishedPaymentStatuses } from './common/FinishedStatuses';
import { OwsSection } from './OwsSection';
import { useUserExpenses } from './useUserExpenses';

import style from './TotalBalance.module.less';

export const TotalBalance: React.FC = () => {
  const { expenses, payments, loading } = useUserExpenses();
  const owsUserAmount =
    expenses
      ?.filter((it) => !finishedExpenseStatuses.includes(it.expenseStatus))
      ?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0;
  const userOwsAmount =
    payments
      ?.filter((it) => !finishedPaymentStatuses.includes(it.status))
      ?.reduce((acc, payment) => acc + (payment?.amount ?? 0), 0) ?? 0;

  console.log(
    '',
    payments?.filter((it) => !finishedPaymentStatuses.includes(it.status)),
  );

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
