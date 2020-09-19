import { useContext } from 'react';

import {
  GetUserPartiesQuery,
  PartyKind,
  SingleExpenseQuery,
  useGetUserPartiesLazyQuery,
} from '../../generated/graphql';
import { UserContext } from '../config/UserProvider';
import { useRemoteData } from '../utils/hooks/useRemoteData';
import { PartyType } from './useNewExpenseForm';

export type PartyElementType = GetUserPartiesQuery['getAllParties'][0];

const isEventTypeOf = (party: { type: PartyKind }, partyType: PartyType | null): boolean => {
  if (partyType === PartyType.EVENT) {
    return party.type === PartyKind.Event;
  }

  if (partyType === PartyType.GROUP) {
    return party.type === PartyKind.Group;
  }

  if (partyType === PartyType.FRIENDS) {
    return party.type === PartyKind.Friends;
  }

  return false;
};

export const useNewExpenseEvents = (selection: PartyType | null) => {
  const { userId } = useContext(UserContext);
  const query = useGetUserPartiesLazyQuery();
  const { extractedData } = useRemoteData(query, query[1].data?.getAllParties, {
    userId: userId ?? undefined,
  });

  return {
    extractedData: extractedData?.filter((it) => isEventTypeOf(it, selection)),
  };
};
