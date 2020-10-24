import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';

import { FormFields } from '../useEventForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Opis:',
  name: FormFields.description,
  rules: [{ required: true }, { min: 3 }, { max: 150 }],
};

export const DescriptionField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <Input.TextArea autoSize placeholder="Wpisz krótki opis wydarzenia" />
  </Form.Item>
);
