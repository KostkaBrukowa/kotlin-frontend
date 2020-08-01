import { SingleExpenseQuery, useSingleExpenseLazyQuery } from '../../../generated/graphql';
import { useRemoteData } from '../../utils/hooks/useRemoteData';

// export type ExpenseQueryType = Pick<SingleExpenseQuery, 'getSingleExpense'>['getSingleExpense'];
export type ExpenseQueryType = SingleExpenseQuery['getSingleExpense'];

export const useSingleExpense = (expenseId?: string) => {
  const query = useSingleExpenseLazyQuery();

  return useRemoteData(query, query[1].data?.getSingleExpense, { expenseId });
};
