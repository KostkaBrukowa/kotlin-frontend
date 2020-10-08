import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';

import { FormFields } from '../useEventForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Nazwa wydarzenia:',
  name: FormFields.name,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

export const NameField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <Input autoComplete="off" />
  </Form.Item>
);
