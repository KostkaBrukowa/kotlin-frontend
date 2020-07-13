import { useContext, useEffect } from 'react';
import { useGetUserDetailsLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useDelayedLoading } from '../utils/hooks/useDelayedLoading';

export const useUserDetails = () => {
  const { userId } = useContext(UserContext);
  const [getUserData, { data, loading, called }] = useGetUserDetailsLazyQuery();
  const delayedLoading = useDelayedLoading({ loading: loading || !called });

  useEffect(() => {
    if (userId !== null) getUserData({ variables: { userId } });
  }, [userId, getUserData]);

  return {
    userData: data,
    loading: delayedLoading,
  };
};
