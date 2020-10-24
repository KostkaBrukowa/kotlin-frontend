import { PartyKind } from '../../../generated/graphql';
import {
  eventsEventRoute,
  eventsFriendsRoute,
  eventsGroupRoute,
} from '../../navigation/routerConstants';

export const eventTypeToRoute = (type: PartyKind) => {
  switch (type) {
    case PartyKind.Event:
    default:
      return eventsEventRoute;
    case PartyKind.Group:
      return eventsGroupRoute;
    case PartyKind.Friends:
      return eventsFriendsRoute;
  }
};
