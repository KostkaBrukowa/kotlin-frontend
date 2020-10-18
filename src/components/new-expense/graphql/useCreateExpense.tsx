import { useCreateExpenseMutation } from '../../../generated/graphql';

export const useCreateExpense = () =>
  useCreateExpenseMutation({
    update: (cache) => {
      cache.modify({
        fields: {
          getExpensesForUser: (value, { DELETE }) => DELETE,
          getClientsPayments: (value, { DELETE }) => DELETE,
          getAllParties: (value, { DELETE }) => DELETE,
        },
      });
    },
  });
