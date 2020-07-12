import { useContext, useEffect } from 'react';
import { useGetUserPartiesLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { fromResponseList } from '../mappers/events/PartyMapper';

export const useUserParties = () => {
  const { userId } = useContext(UserContext);
  const [getExpenses, { data, loading }] = useGetUserPartiesLazyQuery();
  const partiesList = data ? fromResponseList(data.getAllParties) : null;

  useEffect(() => {
    if (userId !== null) getExpenses({ variables: { userId } });
  }, [userId, getExpenses]);

  return {
    parties: partiesList,
    loading,
  };
};
