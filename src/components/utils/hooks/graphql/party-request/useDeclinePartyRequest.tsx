import {
  PartyRequestStatus,
  useDeclinePartyRequestMutation,
} from '../../../../../generated/graphql';

export const useDeclinePartyRequest = () => {
  const [declinePartyRequest] = useDeclinePartyRequestMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.declinePartyRequest) {
        return;
      }

      cache.modify({
        id: cache.identify(data.declinePartyRequest),
        fields: {
          status() {
            return PartyRequestStatus.Declined;
          },
        },
      });
    },
  });

  return {
    declinePartyRequest: (partyRequestId: string) =>
      declinePartyRequest({ variables: { partyRequestId } }),
  };
};
