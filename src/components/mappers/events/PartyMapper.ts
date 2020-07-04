import { PartyKind } from '../../../generated/graphql';
import { PartiesType } from '../../events/useUserParties';
import {
  ListEventPartyType,
  ListFriendsPartyType,
  ListGroupPartyType,
  PartyResponseType,
} from './PartyMapperTypes';

export interface PartiesListResponse {
  events: ListEventPartyType[];
  groups: ListGroupPartyType[];
  friends: ListFriendsPartyType[];
}

function mapEventPartyType(party: PartyResponseType): ListEventPartyType {
  const { id, description, type, name, locationName, owner, __typename } = party;

  if (!name || !locationName) throw Error('Wrong data from server');

  return { id, description, type, name, locationName, owner, __typename };
}

function mapGroupPartyType(party: PartyResponseType): ListGroupPartyType {
  const { id, description, type, name, locationName, owner, __typename } = party;

  if (!name) throw Error('Wrong data from server');

  return { id, description, type, name, locationName, owner, __typename };
}

function mapFriendsPartyType(party: PartyResponseType): ListFriendsPartyType {
  const { id, description, type, locationName, owner } = party;

  return { id, description, owner, locationName, type };
}

export function fromResponseList(parties: PartiesType['getAllParties']): PartiesListResponse {
  const events = parties.filter((it) => it.type === PartyKind.Event).map(mapEventPartyType);
  const groups = parties.filter((it) => it.type === PartyKind.Group).map(mapGroupPartyType);
  const friends = parties.filter((it) => it.type === PartyKind.Friends).map(mapFriendsPartyType);

  return {
    events,
    groups,
    friends,
  };
}
