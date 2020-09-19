import React from 'react';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { useNewExpenseEvents } from '../useNewExpenseEvents';
import { FormFields, FormValues, PartyType } from '../useNewExpenseForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz uczestników wydatku:',
  name: FormFields.participantIds,
  rules: [{ required: true }, { min: 1 }],
};

export interface ExpenseParticipantsSelectFieldProps {
  form: FormInstance<FormValues>;

  rerender(): void;
}

export const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>Nie ma żadnego uczestnika o takim imieniu</p>
  </>
);

export const ExpenseParticipantsSelectField: React.FC<ExpenseParticipantsSelectFieldProps> = ({
  form,
  rerender,
}) => {
  const { partyType, partyId } = form.getFieldsValue() as FormValues;
  const { extractedData: parties } = useNewExpenseEvents(partyType);
  const selectedParty = parties?.find((it) => it.id === partyId);

  return (
    <Form.Item {...formItemProps}>
      <Select
        disabled={!selectedParty && partyType !== PartyType.FRIENDS}
        mode="multiple"
        notFoundContent={<NameNotFound />}
        onChange={rerender}
      >
        {selectedParty?.partyParticipants.map((it) => (
          <Select.Option key={it.id} value={it.id}>
            {it.name ?? ''}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
