import { useCreateEventMutation } from '../../../../generated/graphql';

export const useCreateEvent = () =>
  useCreateEventMutation({
    update: (cache) => {
      cache.modify({
        fields: {
          getAllParties: (value, { DELETE }) => DELETE,
        },
      });
    },
  });
