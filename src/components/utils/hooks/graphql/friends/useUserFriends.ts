import { useContext } from 'react';

import { GetUserFriendsQuery, useGetUserFriendsLazyQuery, } from '../../../../../generated/graphql';
import { UserContext } from '../../../../config/UserProvider';
import { useRemoteData } from '../../useRemoteData';

export type Friend = GetUserFriendsQuery['findUsersFriends'][0];

export const useUserFriends = () => {
  const { userId } = useContext(UserContext);
  const query = useGetUserFriendsLazyQuery();

  return useRemoteData(query, query[1].data?.findUsersFriends, { userId: userId ?? undefined });
};
