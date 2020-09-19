import React from 'react';
import { Form } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import TextArea from 'antd/es/input/TextArea';

import { FormFields, FormValues } from '../useNewExpenseForm';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Opis wydatku:',
  name: FormFields.description,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

export const DescriptionField: React.FC = () => (
  <Form.Item {...formItemProps}>
    <TextArea autoSize placeholder="Wpisz krótki opis wydatku" />
  </Form.Item>
);
