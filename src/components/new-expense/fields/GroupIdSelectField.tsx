import React from 'react';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { TransitionElement } from '../../utils/animations/TransitionElement';
import { FormFields, FormValues, PartyType } from '../useExpenseForm';
import { useNewExpenseEvents } from '../useNewExpenseEvents';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz grupę:',
  name: FormFields.partyId,
};

export interface GroupIdSelectFieldProps {
  form: FormInstance<FormValues>;
  editMode: boolean;

  rerender(): void;
}

export const GroupIdSelectField: React.FC<GroupIdSelectFieldProps> = ({
  rerender,
  form,
  editMode,
}) => {
  const { partyType } = form.getFieldsValue() as FormValues;
  const { extractedData: parties, loading } = useNewExpenseEvents(partyType);

  const visible = partyType === PartyType.FRIENDS || partyType === undefined;

  return (
    <TransitionElement initialHeight="96px" visible={!visible}>
      <Form.Item {...formItemProps}>
        <Select disabled={editMode} loading={loading} onChange={rerender}>
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
