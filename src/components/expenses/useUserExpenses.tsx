import { useContext, useEffect } from 'react';

import { GetUserExpensesQuery, useGetUserExpensesLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useDelayedLoading } from '../utils/hooks/useDelayedLoading';

export type ExpensesQueryType = Pick<GetUserExpensesQuery, 'getExpensesForUser'>;
export type PaymentsQueryType = Pick<GetUserExpensesQuery, 'getClientsPayments'>;

export const useUserExpenses = () => {
  const { userId } = useContext(UserContext);
  const [getExpenses, { data, loading }] = useGetUserExpensesLazyQuery();
  const delayedLoading = useDelayedLoading({ loading });
  const expenses = data?.getExpensesForUser;
  const payments = data?.getClientsPayments;

  useEffect(() => {
    if (userId !== null) getExpenses({ variables: { userId } });
  }, [userId, getExpenses]);

  return {
    expenses,
    payments,
    loading: delayedLoading,
  };
};
