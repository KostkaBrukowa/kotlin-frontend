import { navigate } from '@reach/router';
import { Form } from 'antd';
import { LatLngTuple } from 'leaflet';
import { Moment } from 'moment';

import {
  PartyKind,
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../../generated/graphql';
import { EventMapper } from '../../mappers/events/EventMapper';
import { eventsRoute } from '../../navigation/routerConstants';
import { useSingleEvent } from '../../utils/hooks/graphql/singleEvent/useSingleEvent';

export const partyKindToPartyType = (partyKind: PartyKind | undefined) => {
  switch (partyKind) {
    case PartyKind.Event:
      return EventType.EVENT;
    case PartyKind.Group:
      return EventType.GROUP;
    case PartyKind.Friends:
      return EventType.FRIENDS;
  }

  return null;
};

export enum EventType {
  EVENT = 'EVENT',
  GROUP = 'GROUP',
  FRIENDS = 'FRIENDS',
}

export enum FormFields {
  name = 'name',
  locationName = 'locationName',
  location = 'location',
  eventType = 'eventType',
  partyId = 'partyId',
  participantIds = 'participantIds',
  cost = 'cost',
  date = 'date',
  description = 'description',
}

export interface FormValues {
  [FormFields.name]: string | null;
  [FormFields.locationName]: string | null;
  [FormFields.location]: LatLngTuple | null;
  [FormFields.eventType]: PartyKind | null;
  [FormFields.participantIds]: string[];
  [FormFields.description]: string;
  [FormFields.date]: Moment;
}

const eventMapper = new EventMapper();

export const useEventForm = (eventId: string | undefined) => {
  const [form] = Form.useForm<FormValues>();
  const editEventData = useSingleEvent(eventId);
  const [createEvent, { loading: createSubmitting }] = useCreateEventMutation();
  const [updateEvent, { loading: updateSubmitting }] = useUpdateEventMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      if (eventId) {
        await updateEvent({
          variables: { event: eventMapper.toUpdateRequest(values, eventId) },
        });
      } else {
        await createEvent({ variables: { event: eventMapper.toRequest(values) } });
      }

      await navigate(eventsRoute);
    } catch (e) {}
  };

  return {
    form,
    onSubmit,
    submitting: createSubmitting || updateSubmitting,
    editEventData,
  };
};
