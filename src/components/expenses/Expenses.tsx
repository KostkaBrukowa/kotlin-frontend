import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';

import { AppContext, OwsType } from '../app-context/AppContext';
import { ExpenseList } from './list/ExpenseList';
import { PaymentList } from './list/PaymentList';
import { TotalBalance } from './TotalBalance';
import { useUserExpenses } from './useUserExpenses';

import style from './Expenses.module.less';

export type FriendsProps = RouteComponentProps;

export const Expenses: React.FC<FriendsProps> = () => {
  const {
    state: { currentOwsType, showFinished },
  } = useContext(AppContext);

  const { expenses, payments, loading } = useUserExpenses();

  const paymentList = (
    <PaymentList loading={loading} payments={payments} showFinished={showFinished} />
  );

  const expenseList = (
    <ExpenseList expenses={expenses} loading={loading} showFinished={showFinished} />
  );

  return (
    <section className={style.section}>
      <TotalBalance />
      {currentOwsType === OwsType.USER_OWS ? paymentList : expenseList}
    </section>
  );
};
