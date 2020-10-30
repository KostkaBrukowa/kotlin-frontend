import { PartyKind } from '../../generated/graphql';

export function renderPartyKind(partyKind?: PartyKind): string {
  if (!partyKind) return '';

  switch (partyKind) {
    case PartyKind.Event:
      return 'Wydarzenie';
    case PartyKind.Group:
      return 'Grupa';
    case PartyKind.Friends:
      return 'Znajomi';
    default:
      throw new Error(`Unknown expense status status ${partyKind}`);
  }
}
