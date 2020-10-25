import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';

interface Expense {
  expensePayer: {
    id: string;
  };
  expenseStatus: ExpenseStatus;
  expensePayments: { status: PaymentStatus }[];
}

export const shouldNotRenderEndExpenseButton = (expense: Expense, userId: string | null): boolean =>
  userId !== expense.expensePayer.id ||
  expense.expenseStatus !== ExpenseStatus.InProgressPaying ||
  expense.expensePayments.some(
    (it) => it.status !== PaymentStatus.Paid && it.status !== PaymentStatus.Declined,
  );

export const shouldNotRenderConfirmPaymentsButton = (
  expense: Expense,
  userId: string | null,
): boolean =>
  userId !== expense.expensePayer.id ||
  expense.expenseStatus !== ExpenseStatus.InProgressRequesting ||
  expense.expensePayments.some(
    (it) => it.status !== PaymentStatus.Accepted && it.status !== PaymentStatus.Declined,
  );
