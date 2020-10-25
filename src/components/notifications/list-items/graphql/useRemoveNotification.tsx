import { useRemoveNotificationMutation } from '../../../../generated/graphql';

export const useRemoveNotification = (notificationId: string) => {
  const [removeNotification] = useRemoveNotificationMutation({
    variables: { notificationId },
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.removeNotification) {
        return;
      }

      cache.modify({
        id: cache.identify(data.removeNotification),
        fields: (value, { DELETE }) => DELETE,
      });
    },
  });

  return {
    removeNotification,
  };
};
