import { ExpenseStatus, useChangeExpenseStatusMutation } from '../../../../generated/graphql';

export const useChangeExpenseStatus = (expenseId: string, expenseStatus: ExpenseStatus) => {
  const [changeExpenseStatus, { loading }] = useChangeExpenseStatusMutation({
    variables: { expenseId, status: expenseStatus },
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.changeExpenseStatus) {
        return;
      }

      cache.modify({
        id: cache.identify(data.changeExpenseStatus),
        fields: {
          expenseStatus() {
            return data.changeExpenseStatus.expenseStatus;
          },
        },
      });
    },
  });

  return {
    loading,
    changeExpenseStatus,
  };
};
