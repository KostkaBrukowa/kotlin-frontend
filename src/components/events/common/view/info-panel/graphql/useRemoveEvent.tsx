import { useRemoveEventMutation } from '../../../../../../generated/graphql';

export const useRemoveEvent = () => {
  const [removeEvent] = useRemoveEventMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.removeParty) {
        return;
      }

      cache.modify({
        id: cache.identify(data.removeParty),
        fields: (value, { DELETE }) => DELETE,
      });
    },
  });

  return {
    removeEvent: (eventId: string) => removeEvent({ variables: { eventId } }),
  };
};
