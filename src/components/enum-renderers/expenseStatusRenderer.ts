import { ExpenseStatus } from '../../generated/graphql';

export function getExpenseTooltipProps(status?: ExpenseStatus): string {
  if (!status) return '';

  switch (status) {
    case ExpenseStatus.InProgressRequesting:
      return 'Oczekujące';
    case ExpenseStatus.InProgressPaying:
      return 'W trakcie';
    case ExpenseStatus.Declined:
      return 'Odrzucone';
    case ExpenseStatus.Resolved:
      return 'Zakończone';
    default:
      throw new Error(`Uknown expense status status ${status}`);
  }
}
