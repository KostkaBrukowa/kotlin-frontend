import { SingleEventQuery, useSingleEventLazyQuery } from '../../../../../generated/graphql';
import { useRemoteData } from '../../useRemoteData';

export type EventQueryType = SingleEventQuery['getSingleParty'];

export const useSingleEvent = (eventId?: string) => {
  const query = useSingleEventLazyQuery();

  return useRemoteData(query, query[1].data?.getSingleParty, { eventId });
};
