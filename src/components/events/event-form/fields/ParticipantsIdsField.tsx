import React from 'react';
import { Link } from '@reach/router';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { ParticipantList } from '../../../common/participant-list/ParticipantList';
import { eventsEventRoute } from '../../../navigation/routerConstants';
import { useUserFriends } from '../../../utils/hooks/graphql/friends/useUserFriends';
import { Optional } from '../../../utils/types';
import { FormFields, FormValues } from '../useEventForm';

import style from '../../../new-expense/fields/Fields.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz uczestników wydarzenia:',
  name: FormFields.participantIds,
  rules: [
    { type: 'array', required: true },
    { type: 'array', min: 1 },
  ],
};

export interface ExpenseParticipantsSelectFieldProps {
  form: FormInstance<FormValues>;
  eventId: Optional<string>;

  rerender(): void;
}

interface ParticipantsSelectProps {
  loading: boolean;
  disabled: boolean;
  rerender: () => void;
}

export const EventParticipantIdsField: React.FC<ExpenseParticipantsSelectFieldProps> = ({
  form,
  rerender,
  eventId,
}) => {
  const editMode = Boolean(eventId);
  const { eventType } = form.getFieldsValue() as Record<FormFields, any>;
  const { extractedData: friends, loading } = useUserFriends();
  const disabled = !eventType;
  const editModeTitle = (
    <div>
      Uczestnicy <Link to={`${eventsEventRoute}/${eventId}`}>Sprawdź stan zaproszeń</Link>
    </div>
  );

  return (
    <Form.Item {...formItemProps} label={editMode ? editModeTitle : formItemProps.label}>
      {eventId ? (
        <ParticipantList
          loading={loading || !friends}
          notFoundContent={<NoParticipants eventId={eventId} />}
          participants={friends}
        />
      ) : (
        <Select
          disabled={disabled}
          loading={loading}
          mode="multiple"
          notFoundContent={<NameNotFound />}
          onChange={rerender}
        >
          {friends?.map((it) => (
            <Select.Option className={style.option} key={it.id} value={it.id}>
              {it.name ?? ''}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>
      Nie ma żadnego uczestnika o takim imieniu <Link to="/">Dodaj znajomego</Link>
    </p>
  </>
);

const NoParticipants: React.FC<{ eventId: string }> = ({ eventId }) => (
  <>
    <h3>Pusto...</h3>
    <p>Żaden użytkownik nie zaakceptował jeszcze zaproszenia. </p>
  </>
);
