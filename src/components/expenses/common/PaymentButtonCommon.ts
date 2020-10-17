import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from '../payment-view/graphql/useSinglePayment';

export const isPaymentActionable = (paymentStatus: PaymentStatus, expenseStatus: ExpenseStatus) =>
  paymentStatus === PaymentStatus.InProgress ||
  (paymentStatus === PaymentStatus.Accepted && expenseStatus === ExpenseStatus.InProgressPaying);
