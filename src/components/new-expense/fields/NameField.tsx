import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';

import { FormFields } from '../useExpenseForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Nazwa wydatku',
  name: FormFields.name,
  rules: [{ required: true }, { min: 2 }, { max: 50 }], // todo
};

export const NameField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <Input autoComplete="off" />
  </Form.Item>
);
