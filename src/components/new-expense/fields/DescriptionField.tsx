import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { FormFields, FormValues } from '../useExpenseForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Opis wydatku:',
  name: FormFields.description,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

export const DescriptionField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <Input.TextArea autoSize placeholder="Wpisz krótki opis wydatku" />
  </Form.Item>
);
