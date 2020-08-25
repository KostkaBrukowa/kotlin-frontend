import { useContext } from 'react';

import { useGetUserDetailsLazyQuery } from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useRemoteData } from '../utils/hooks/useRemoteData';

export const useUserDetails = () => {
  const { userId } = useContext(UserContext);
  const query = useGetUserDetailsLazyQuery();

  return useRemoteData(query, query[1].data?.getUser, { userId: userId ?? undefined });
};
