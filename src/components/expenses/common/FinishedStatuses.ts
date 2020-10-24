import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';

export const finishedPaymentStatuses: PaymentStatus[] = [
  PaymentStatus.Confirmed,
  PaymentStatus.Declined,
  PaymentStatus.Bulked,
];
export const finishedExpenseStatuses: ExpenseStatus[] = [
  ExpenseStatus.Resolved,
  ExpenseStatus.Declined,
];
