import React from 'react';
import { Link } from '@reach/router';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { ParticipantList } from '../../../common/participant-list/ParticipantList';
import { friendsRoute, } from '../../../navigation/routerConstants';
import { useUserFriends } from '../../../utils/hooks/graphql/friends/useUserFriends';
import { Optional } from '../../../utils/types';
import { eventTypeToRoute } from '../../common/Route';
import { FormFields, FormValues } from '../useEventForm';

import style from '../../../new-expense/fields/Fields.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: (
    <>
      Wybierz uczestników wydarzenia:-{'>'} <Link to={`${friendsRoute}`}> Nowy znajomy</Link>
    </>
  ),
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
      Uczestnicy{' '}
      <Link to={`${eventTypeToRoute(eventType)}/${eventId}#participants`}>
        Sprawdź stan zaproszeń
      </Link>
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
          filterOption={(inputValue, option) =>
            friends?.find((it) => it.id === option?.key)?.name.includes(inputValue) ?? false
          }
          loading={loading}
          mode="multiple"
          notFoundContent={<NameNotFound />}
          onChange={rerender}
        >
          {friends?.map((it) => (
            <Select.Option className={style.option} key={it.id} value={it.id}>
              {it.name}
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
    <p>Nie ma żadnego uczestnika o takim imieniu</p>
  </>
);

const NoParticipants: React.FC<{ eventId: string }> = ({ eventId }) => (
  <>
    <h3>Pusto...</h3>
    <p>Żaden użytkownik nie zaakceptował jeszcze zaproszenia. </p>
  </>
);
