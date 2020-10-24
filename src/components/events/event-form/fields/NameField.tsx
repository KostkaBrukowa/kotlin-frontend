import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { PartyKind } from '../../../../generated/graphql';
import { FormFields, FormValues } from '../useEventForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Nazwa:',
  name: FormFields.name,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

interface NameFieldProps {
  editMode: boolean;
  form: FormInstance<FormValues>;
}

export const NameField: React.FC<NameFieldProps> = ({ form, editMode }) => {
  if (editMode && form.getFieldValue(FormFields.eventType) === PartyKind.Friends) return null;

  return (
    <Form.Item {...formItemProps}>
      <Input autoComplete="off" />
    </Form.Item>
  );
};
