import React from 'react';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { TransitionElement } from '../../utils/animations/TransitionElement';
import { useNewExpenseEvents } from '../useNewExpenseEvents';
import { FormFields, FormValues, PartyType } from '../useNewExpenseForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz grupę:',
  name: FormFields.partyId,
};

export interface GroupIdSelectFieldProps {
  form: FormInstance<FormValues>;

  rerender(): void;
}

export const GroupIdSelectField: React.FC<GroupIdSelectFieldProps> = ({ rerender, form }) => {
  const { partyType } = form.getFieldsValue() as FormValues;
  const { extractedData: parties } = useNewExpenseEvents(partyType);

  const disabled = partyType === PartyType.FRIENDS || partyType === undefined;

  return (
    <TransitionElement initialHeight="96px" visible={!disabled}>
      <Form.Item {...formItemProps}>
        <Select disabled={disabled} onChange={rerender}>
          {parties?.map((it) => (
            <Select.Option key={it.id} value={it.id}>
              {it.name ?? ''}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </TransitionElement>
  );
};
