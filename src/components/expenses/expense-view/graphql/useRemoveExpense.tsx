import { useRemoveExpenseMutation } from '../../../../generated/graphql';

export const useRemoveExpense = () => {
  const [removeExpense] = useRemoveExpenseMutation({
    update: (cache, mutationResult) => {
      const { data } = mutationResult;

      if (!data?.removeExpense) {
        return;
      }

      cache.modify({
        id: cache.identify(data.removeExpense),
        fields: (value, { DELETE }) => DELETE,
      });
    },
  });

  return {
    removeExpense: (expenseId: string) => removeExpense({ variables: { expenseId } }),
  };
};
