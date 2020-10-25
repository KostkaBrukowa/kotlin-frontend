import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from '../payment-view/graphql/useSinglePayment';

export const isPaymentActionable = (paymentStatus: PaymentStatus, expenseStatus: ExpenseStatus) =>
  paymentStatus === PaymentStatus.InProgress ||
  (paymentStatus === PaymentStatus.Accepted && expenseStatus === ExpenseStatus.InProgressPaying);

export const getManagePaymentButtonTitle = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.Accepted:
      return 'Rozlicz się';
    case PaymentStatus.InProgress:
      return 'Potwierdź udział';
    case PaymentStatus.Bulked: // todo bulked
    default:
      return null;
  }
};
