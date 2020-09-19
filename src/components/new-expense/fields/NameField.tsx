import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';

import { FormFields } from '../useNewExpenseForm';

// const formItemProps = (required = true): {label: string, name: string, required: boolean} => ({
//
// })

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: FormFields.name,
  name: FormFields.name,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

export const NameField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <Input autoComplete="off" />
  </Form.Item>
);
