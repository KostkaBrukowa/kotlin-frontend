import {
  PartyRequestStatus,
  useAcceptPartyRequestMutation,
} from '../../../../../generated/graphql';

export const useAcceptPartyRequest = (partyRequestId: string) => {
  const [acceptPartyRequest] = useAcceptPartyRequestMutation({
    variables: { partyRequestId },
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.acceptPartyRequest) {
        return;
      }

      cache.modify({
        id: cache.identify(data.acceptPartyRequest),
        fields: {
          status() {
            return PartyRequestStatus.Accepted;
          },
        },
      });
    },
  });

  return { acceptPartyRequest };
};
