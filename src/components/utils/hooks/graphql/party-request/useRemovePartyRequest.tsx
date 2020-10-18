import { useRemovePartyRequestMutation } from '../../../../../generated/graphql';

export const useRemovePartyRequest = () => {
  const [removePartyRequest] = useRemovePartyRequestMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.removePartyRequest) {
        return;
      }

      cache.modify({
        id: cache.identify(data.removePartyRequest),
        fields: (value, { DELETE }) => DELETE,
      });
    },
  });

  return {
    removePartyRequest: (id: string) => removePartyRequest({ variables: { partyRequestId: id } }),
  };
};
