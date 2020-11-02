import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RouteComponentProps } from '@reach/router';
import { Button, Form } from 'antd';
import moment from 'moment';

import { SingleEventQuery } from '../../../generated/graphql';
import { singleViewStyle } from '../../utils/components/ViewStyles';
import { validateMessages } from '../../utils/form/validationMessages';
import { dateFrom } from '../../utils/functions/date';
import { useRerender } from '../../utils/hooks/useRerender';
import { DescriptionField } from './fields/DescriptionField';
import { EventTypeField } from './fields/EventTypeField';
import { MapField } from './fields/MapField';
import { NameField } from './fields/NameField';
import { EventParticipantIdsField } from './fields/ParticipantsIdsField';
import { StartDateField } from './fields/StartDateField';
import { FormFields, FormValues, useEventForm } from './useEventForm';

import style from './EventForm.module.less';

interface RouteProps {
  eventId: string;
}

export type EventFormProps = RouteComponentProps<RouteProps>;

const getInitialValues = (event?: SingleEventQuery['getSingleParty']): FormValues | undefined => {
  if (!event) return;

  const {
    startDate,
    type,
    locationName,
    locationLatitude,
    locationLongitude,
    description,
    name,
    partyParticipants,
  } = event;

  return {
    [FormFields.name]: name ?? null,
    [FormFields.date]: moment(dateFrom(startDate)),
    [FormFields.description]: description ?? '',
    [FormFields.eventType]: type,
    [FormFields.location]:
      locationLatitude && locationLongitude ? [locationLatitude, locationLongitude] : null,
    [FormFields.locationName]: locationName ?? null,
    [FormFields.participantIds]: partyParticipants?.map((it) => it.id),
  };
};

export const EventForm: React.FC<EventFormProps> = ({ eventId }) => {
  const editMode = Boolean(eventId);
  const {
    form,
    onSubmit,
    submitting,
    editEventData: { extractedData, dataComponent },
  } = useEventForm(eventId);
  const rerender = useRerender();
  const initialValues = getInitialValues(extractedData);
  const minMd = useMediaQuery({ minWidth: 768 });

  if ((dataComponent !== null || !extractedData) && editMode) return dataComponent;

  return (
    <div className={style.wrapper} style={singleViewStyle}>
      <Form
        scrollToFirstError
        colon={false}
        form={form}
        initialValues={initialValues}
        layout="vertical"
        size={minMd ? 'large' : 'middle'}
        validateMessages={validateMessages}
        onFinish={onSubmit}
      >
        <NameField editMode={editMode} form={form} />

        <EventTypeField editMode={editMode} form={form} rerender={rerender} />

        <EventParticipantIdsField eventId={eventId} form={form} rerender={rerender} />

        <DescriptionField />

        <StartDateField form={form} initialValues={initialValues} />

        <MapField form={form} initialValues={initialValues} />

        <Button
          className={style.submitButton}
          htmlType="submit"
          loading={submitting}
          size="large"
          type="primary"
        >
          {editMode ? 'Edytuj' : 'Utwórz'}
        </Button>
      </Form>
    </div>
  );
};
