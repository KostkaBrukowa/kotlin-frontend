import { PartiesType } from '../../events/useUserParties';
import { Maybe, PartyType } from '../../../generated/graphql';

export type PartyResponseType = PartiesType['getAllParties'][0];

export interface ListEventPartyType
  extends Omit<Pick<EventPartyType, keyof PartyResponseType>, 'owner'> {
  owner?: PartyResponseType['owner'];
}

export interface ListGroupPartyType
  extends Omit<Pick<GroupPartyType, keyof PartyResponseType>, 'owner'> {
  owner?: PartyResponseType['owner'];
}

export interface ListFriendsPartyType
  extends Omit<Pick<FriendsPartyType, Exclude<keyof PartyResponseType, 'name'>>, 'owner'> {
  owner?: PartyResponseType['owner'];
}

export type BasePartyType = Pick<
  PartyType,
  'startDate' | 'owner' | 'type' | 'id' | 'description' | '__typename'
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
