import { useContext } from 'react';

import {
  GetUserPartyRequestsQuery,
  useGetUserPartyRequestsLazyQuery,
} from '../../../../../generated/graphql';
import { UserContext } from '../../../../config/UserProvider';
import { useRemoteData } from '../../useRemoteData';

export type PartyRequestQueryType = GetUserPartyRequestsQuery['getPartyRequestsForUser'];

export const useUserPartyRequests = () => {
  const { userId } = useContext(UserContext);
  const query = useGetUserPartyRequestsLazyQuery();

  return useRemoteData(query, query[1].data?.getPartyRequestsForUser, {
    userId: userId ?? undefined,
  });
};
