import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import clsx from 'clsx';
import { TotalBalance } from './TotalBalance';
import { AppContext, OwsType } from '../app-context/AppContext';
import { ExpenseList } from './list/ExpenseList';
import { PaymentList } from './list/PaymentList';
import { useUserExpenses } from './useUserExpenses';
import { AnimateChange } from '../utils/animations/AnimateChange';
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
    <section>
      <TotalBalance />
      <AnimateChange
        firstElement={expenseList}
        firstElementActive={currentOwsType === OwsType.OWS_USER}
        secondElement={paymentList}
        wrapperClassName={clsx('data-cy-expenses-list', style.changeElement)}
      />
    </section>
  );
};
