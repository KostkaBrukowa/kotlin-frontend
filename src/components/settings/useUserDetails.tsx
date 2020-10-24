import { useGetUserDetailsLazyQuery } from '../../generated/graphql';
import { useRemoteData } from '../utils/hooks/useRemoteData';

export const useUserDetails = (userId: string | null) => {
  const query = useGetUserDetailsLazyQuery();

  return useRemoteData(query, query[1].data?.getUser, { userId: userId ?? undefined });
};
