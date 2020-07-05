import { useContext, useEffect } from 'react';
import { useGetUserPartiesLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { fromResponseList } from '../mappers/events/PartyMapper';

export const useUserParties = () => {
  const { userId } = useContext(UserContext);
  const [getExpenses, { data, loading }] = useGetUserPartiesLazyQuery({ variables: { userId } });
  const partiesList = data ? fromResponseList(data.getAllParties) : null;

  useEffect(() => {
    if (userId !== null) getExpenses();
  }, [userId, getExpenses]);

  return {
    parties: partiesList,
    loading,
  };
};
