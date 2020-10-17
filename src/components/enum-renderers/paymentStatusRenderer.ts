import { PaymentStatus } from '../../generated/graphql';

export function renderPaymentStatus(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.InProgress:
      return 'Płatność oczekująca.';
    case PaymentStatus.Accepted:
      return 'Płatność zaakceptowana.';
    case PaymentStatus.Bulked:
      return 'Płatność połączona.';
    case PaymentStatus.Confirmed:
      return 'Płatność zakończona.';
    case PaymentStatus.Declined:
      return 'Płatność odrzucona.';
    case PaymentStatus.Paid:
      return 'Płatność opłacona.';
    default:
      throw new Error(`Uknown payment status ${status}`);
  }
}
