import { useContext } from 'react';

import { useGetUserFriendsLazyQuery, useSingleEventLazyQuery } from '../../../../generated/graphql';
import { UserContext } from '../../../config/UserProvider';
import { useRemoteData } from '../../../utils/hooks/useRemoteData';

export const useUserFriends = () => {
  const { userId } = useContext(UserContext);
  const query = useGetUserFriendsLazyQuery();

  return useRemoteData(query, query[1].data?.findUsersFriends, { userId: userId ?? undefined });
};
