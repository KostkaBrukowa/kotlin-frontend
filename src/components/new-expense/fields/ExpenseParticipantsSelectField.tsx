import React from 'react';
import { Form, List, Select, Spin } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { ParticipantList } from '../../common/participant-list/ParticipantList';
import { Optional } from '../../utils/types';
import { FormFields, FormValues, PartyType } from '../useExpenseForm';
import { PartyElementType, useNewExpenseEvents } from '../useNewExpenseEvents';

import style from './Fields.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz uczestników wydatku:',
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
  selectedParty: Optional<PartyElementType>;
}

export const ExpenseParticipantsSelectField: React.FC<ExpenseParticipantsSelectFieldProps> = ({
  form,
  rerender,
  editMode,
}) => {
  const { partyType, partyId } = form.getFieldsValue() as Record<FormFields, any>;
  const { extractedData: parties, loading, dataComponent } = useNewExpenseEvents(partyType);
  const selectedParty = parties?.find((it) => it.id === partyId);
  const disabled = (!selectedParty && partyType !== PartyType.FRIENDS) || editMode;

  // if (loading || !parties) return <Spin />;

  return (
    <Form.Item {...formItemProps} label={editMode ? 'Uczestnicy:' : formItemProps.label}>
      {editMode ? (
        <ParticipantList
          loading={loading || !parties}
          participants={selectedParty?.partyParticipants}
        />
      ) : (
        <Select
          disabled={disabled}
          loading={loading}
          mode="multiple"
          notFoundContent={<NameNotFound />}
          onChange={rerender}
        >
          {selectedParty?.partyParticipants.map((it) => (
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
