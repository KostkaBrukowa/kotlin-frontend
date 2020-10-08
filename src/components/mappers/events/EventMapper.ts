import { EditPartyInput, NewPartyInput, PartyKind } from '../../../generated/graphql';
import { FormValues } from '../../events/event-form/useEventForm';
import { RequestMapper } from '../mapper';

export class EventMapper extends RequestMapper<FormValues, NewPartyInput> {
  public toRequest(model: FormValues): NewPartyInput {
    const { locationName, name, eventType, date, participantIds, description, location } = model;

    return {
      description,
      locationLatitude: location?.[0] ?? null,
      locationLongitude: location?.[1] ?? null,
      endDate: null,
      locationName: locationName ?? null,
      name: name ?? '',
      participants: participantIds,
      startDate: date,
      type: eventType ?? PartyKind.Friends,
    };
  }

  public toUpdateRequest(model: FormValues, partyId: string): EditPartyInput {
    const { locationName, name, eventType, date, description, location } = model;

    return {
      id: partyId,
      description,
      locationLatitude: location?.[0] ?? null,
      locationLongitude: location?.[1] ?? null,
      endDate: null,
      locationName: locationName ?? null,
      name: name ?? '',
      startDate: date,
      type: eventType ?? PartyKind.Friends,
    };
  }
}
