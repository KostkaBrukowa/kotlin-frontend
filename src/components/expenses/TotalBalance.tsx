import React from 'react';
import { Spin } from 'antd';
import style from './TotalBalance.module.less';
import { OwsSection } from './OwsSection';
import { useUserExpenses } from './useUserExpenses';
import { AnimatedNumber } from '../utils/animations/AnimatedNumber';
import { currency } from '../utils/constants/currency';
import { OwsType } from '../app-context/AppContext';

export interface TotalBalanceProps {}

export const TotalBalance: React.FC<TotalBalanceProps> = (props) => {
  const { expenses, payments, loading } = useUserExpenses();
  const owsUserAmount = expenses?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0;
  const userOwsAmount = payments?.reduce((acc, payment) => acc + (payment?.amount ?? 0), 0) ?? 0;

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>
        Calkowity bilans: <AnimatedNumber amount={owsUserAmount - userOwsAmount} /> {currency}
        {loading && <Spin className={style.spin} />}
      </h3>

      <OwsSection amount={owsUserAmount} type={OwsType.OWS_USER} />
      <OwsSection amount={userOwsAmount} type={OwsType.USER_OWS} />
    </div>
  );
};
