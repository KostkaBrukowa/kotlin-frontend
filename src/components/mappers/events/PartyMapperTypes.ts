import { GetUserPartiesQuery, PartyType } from '../../../generated/graphql';

export type PartiesType = Pick<GetUserPartiesQuery, 'getAllParties'>;

export type PartyResponseType = PartiesType['getAllParties'][0];

export interface EventPartyListType
  extends Omit<Pick<EventPartyType, keyof PartyResponseType>, 'owner' | 'partyParticipants'> {
  owner?: PartyResponseType['owner'];
  partyParticipants: PartyResponseType['partyParticipants'];
}

export interface GroupPartyListType
  extends Omit<Pick<GroupPartyType, keyof PartyResponseType>, 'owner' | 'partyParticipants'> {
  owner?: PartyResponseType['owner'];
  partyParticipants: PartyResponseType['partyParticipants'];
}

export interface FriendsPartyListType
  extends Omit<
    Pick<FriendsPartyType, Exclude<keyof PartyResponseType, 'name'>>,
    'owner' | 'partyParticipants'
  > {
  owner?: PartyResponseType['owner'];
  partyParticipants: PartyResponseType['partyParticipants'];
}

export type BasePartyType = Pick<
  PartyType,
  | 'startDate'
  | 'owner'
  | 'type'
  | 'id'
  | 'description'
  | '__typename'
  | 'partyExpenses'
  | 'partyMessages'
  | 'partyParticipants'
  | 'partyPartyRequests'
>;

export interface EventPartyType extends BasePartyType {
  name: string;
  endDate: string;
  locationLatitude: number;
  locationLongitude: number;
  locationName: string;
}

export interface GroupPartyType
  extends BasePartyType,
    Pick<PartyType, 'locationLatitude' | 'locationLongitude' | 'locationName'>,
    Required<Pick<PartyType, 'name'>> {
  name: string;
}

export interface FriendsPartyType
  extends BasePartyType,
    Pick<PartyType, 'locationLatitude' | 'locationLongitude' | 'locationName'> {}
