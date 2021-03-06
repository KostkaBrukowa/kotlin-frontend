import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { ParticipantList } from '../../common/participant-list/ParticipantList';
import { UserContext } from '../../config/UserProvider';
import { friendsRoute } from '../../navigation/routerConstants';
import { useUserFriends } from '../../utils/hooks/graphql/friends/useUserFriends';
import { FormFields, FormValues, PartyType } from '../useExpenseForm';
import { useNewExpenseEvents } from '../useNewExpenseEvents';

import style from './Fields.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: (
    <>
      Wybierz uczestników wydatku:-{'>'} <Link to={`${friendsRoute}`}>Nowy znajomy</Link>
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
  editMode: boolean;

  rerender(): void;
}

interface ParticipantsSelectProps {
  loading: boolean;
  disabled: boolean;
  rerender: () => void;
}

export const ExpenseParticipantsSelectField: React.FC<ExpenseParticipantsSelectFieldProps> = ({
  form,
  rerender,
  editMode,
}) => {
  const { userId } = useContext(UserContext);
  const { partyType, partyId } = form.getFieldsValue() as Record<FormFields, any>;
  const { extractedData: parties, loading: partiesLoading } = useNewExpenseEvents(partyType);
  const { extractedData: friends, loading: friendsLoading } = useUserFriends();
  const selectedParty = parties?.find((it) => it.id === partyId);
  const disabled = (!selectedParty && partyType !== PartyType.FRIENDS) || editMode;

  const participants = partyType === PartyType.FRIENDS ? friends : selectedParty?.partyParticipants;
  const loading = partyType === PartyType.FRIENDS ? friendsLoading : partiesLoading;

  return (
    <Form.Item {...formItemProps} label={editMode ? 'Uczestnicy:' : formItemProps.label}>
      {editMode ? (
        <ParticipantList loading={loading || !parties} participants={participants} />
      ) : (
        <Select
          disabled={disabled}
          filterOption={(inputValue, option) =>
            participants?.find((it) => it.id === option?.key)?.name.includes(inputValue) ?? false
          }
          loading={loading}
          mode="multiple"
          notFoundContent={<NameNotFound />}
          onChange={rerender}
        >
          {participants
            ?.filter((it) => it.id !== userId)
            ?.map((it) => (
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
    <p>Nie ma żadnego uczestnika o takim imieniu</p>
  </>
);
