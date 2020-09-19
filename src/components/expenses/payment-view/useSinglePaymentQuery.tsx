import { SinglePaymentQuery, useSinglePaymentLazyQuery } from '../../../generated/graphql';
import { useRemoteData } from '../../utils/hooks/useRemoteData';

export type PaymentQueryType = SinglePaymentQuery['getSinglePayment'];

export const useSinglePayment = (paymentId?: string) => {
  const query = useSinglePaymentLazyQuery();

  return useRemoteData(query, query[1].data?.getSinglePayment, { paymentId });
};
