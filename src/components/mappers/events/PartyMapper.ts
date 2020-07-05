import { PartyKind } from '../../../generated/graphql';
import {
  EventPartyListType,
  FriendsPartyListType,
  GroupPartyListType,
  PartiesType,
  PartyResponseType,
} from './PartyMapperTypes';

export interface PartiesListResponse {
  events: EventPartyListType[];
  groups: GroupPartyListType[];
  friends: FriendsPartyListType[];
}

function mapEventPartyType(party: PartyResponseType): EventPartyListType {
  const { id, description, type, name, locationName, owner, __typename, partyParticipants } = party;

  if (!name || !locationName) {
    throw Error(`Wrong data from server in event party type${JSON.stringify(party)}`);
  }

  return { id, description, type, name, locationName, owner, __typename, partyParticipants };
}

function mapGroupPartyType(party: PartyResponseType): GroupPartyListType {
  const { id, description, type, name, locationName, owner, __typename, partyParticipants } = party;

  if (!name) throw Error(`Wrong data from server in friends party type ${JSON.stringify(party)}`);

  return { id, description, type, name, locationName, owner, __typename, partyParticipants };
}

function mapFriendsPartyType(party: PartyResponseType): FriendsPartyListType {
  const { id, description, type, locationName, owner, partyParticipants } = party;

  return { id, description, owner, locationName, type, partyParticipants };
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
