import { PaymentStatus, useChangePaymentStatusMutation } from '../../../../generated/graphql';

export const useChangePaymentStatus = (paymentId: string) => {
  const [changePaymentStatus, { loading }] = useChangePaymentStatusMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.updatePaymentStatus) {
        return;
      }

      cache.modify({
        id: cache.identify(data.updatePaymentStatus),
        fields: {
          status() {
            return data.updatePaymentStatus.status;
          },
        },
      });
    },
  });

  return {
    loading,
    changePaymentStatus: (paymentStatus: PaymentStatus) =>
      changePaymentStatus({ variables: { paymentId, paymentStatus } }),
  };
};
