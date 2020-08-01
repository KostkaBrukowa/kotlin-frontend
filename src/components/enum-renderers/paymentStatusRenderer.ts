import { PaymentStatus } from '../../generated/graphql';

export function renderPaymentStatus(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.InProgress:
      return 'Platność oczekująca.';
    case PaymentStatus.Accepted:
      return 'Platność zaakceptowana.';
    case PaymentStatus.Bulked:
      return 'Platność połączona.';
    case PaymentStatus.Confirmed:
      return 'Platność zakończona.';
    case PaymentStatus.Declined:
      return 'Platność odrzucona.';
    case PaymentStatus.Paid:
      return 'Użytkownik opłacona.';
    default:
      throw new Error(`Uknown payment status ${status}`);
  }
}
