import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TotalBalance } from './TotalBalance';
import { ExpensesContext, FriendsProvider, OwsType } from './ExpensesContext';
import { ExpenseList } from './list/ExpenseList';
import { PaymentList } from './list/PaymentList';
import { useUserExpenses } from './useUserExpenses';
import { ChangeElement } from '../utils/animations/ChangeElement';
import style from './Expenses.module.less';

export type FriendsProps = RouteComponentProps;

export const List: React.FC<FriendsProps> = () => {
  const {
    state: { currentOwsType },
  } = useContext(ExpensesContext);

  const { expenses, payments, loading } = useUserExpenses();

  return (
    <ChangeElement
      firstElement={<ExpenseList expenses={expenses} loading={loading} />}
      firstElementActive={currentOwsType === OwsType.OWS_USER}
      secondElement={<PaymentList loading={loading} payments={payments} />}
      wrapperClassName={style.changeElement}
    />
  );
};

export const Expenses: React.FC<FriendsProps> = () => (
  <section>
    <FriendsProvider>
      <TotalBalance />
      <List />
    </FriendsProvider>
  </section>
);
