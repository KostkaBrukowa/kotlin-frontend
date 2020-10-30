import { Reference } from '@apollo/client';

import {
  UpdatePartyWithPartyRequestFragmentDoc,
  useSendPartyRequestMutation,
} from '../../../../../generated/graphql';

export const useSendPartyRequest = (partyId: string) => {
  const [sendPartyRequest, { loading }] = useSendPartyRequestMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      cache.modify({
        id: cache.identify({ __ref: `PartyType:${partyId}`, __typename: 'PartyType' }),
        fields: {
          partyPartyRequests(existingPartyRequests: Reference[] = []) {
            const newPartyRequest = cache.writeFragment({
              data: data?.sendPartyRequest,
              fragment: UpdatePartyWithPartyRequestFragmentDoc,
            });

            return [...existingPartyRequests, newPartyRequest];
          },
        },
      });
    },
  });

  return {
    loading,
    sendPartyRequest: (requestReceiverId: string) =>
      sendPartyRequest({ variables: { partyId, requestReceiverId } }),
  };
};
