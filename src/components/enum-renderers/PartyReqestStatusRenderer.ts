import { PartyRequestStatus } from '../../generated/graphql';

export function renderPartyRequestStatus(status?: PartyRequestStatus): string {
  if (!status) return '';

  switch (status) {
    case PartyRequestStatus.Accepted:
      return 'Zaakceptowane';
    case PartyRequestStatus.Declined:
      return 'Odrzucone';
    case PartyRequestStatus.InProgress:
      return 'Wysłane';
    default:
      throw new Error(`Unknown expense status status ${status}`);
  }
}
