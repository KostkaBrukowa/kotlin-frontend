import { useEditExpenseDataLazyQuery, useSinglePaymentLazyQuery } from '../../generated/graphql';
import { useRemoteData } from '../utils/hooks/useRemoteData';

export const useEditExpenseData = (expenseId?: string) => {
  const query = useEditExpenseDataLazyQuery();

  return useRemoteData(query, query[1].data?.getSingleExpense, { expenseId });
};
