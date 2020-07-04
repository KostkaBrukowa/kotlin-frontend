import { useContext, useEffect } from 'react';
import { GetUserPartiesQuery, useGetUserPartiesLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useDelayedLoading } from '../utils/hooks/useDelayedLoading';

export type PartiesType = Pick<GetUserPartiesQuery, 'getAllParties'>;
// export type PaymentsQueryType = Pick<GetUserExpensesQuery, 'getClientsPayments'>;
//
export const useUserParties = () => {
  const { userId } = useContext(UserContext);
  const [getExpenses, { data, loading }] = useGetUserPartiesLazyQuery({ variables: { userId } });
  const delayedLoading = useDelayedLoading({ loading });
  // const expenses = data?.getExpensesForUser;
  // const payments = data?.getClientsPayments;

  useEffect(() => {
    if (userId !== null) getExpenses();
  }, [userId, getExpenses]);

  return {
    parties: data?.getAllParties,
    loading: delayedLoading,
  };
};
