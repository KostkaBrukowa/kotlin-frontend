import React, { useState } from 'react';
import { Form, InputNumber, Switch } from 'antd';
import { FormItemProps } from 'antd/es/form';

import { ExpenseStatus } from '../../../generated/graphql';
import { FormFields } from '../useExpenseForm';

const letterRegex = /\p{General_Category=Letter}/gu;

export interface CostFieldProps {
  expenseStatus?: ExpenseStatus;
  editMode: boolean;
}

const costFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Ile zapłaciłeś:',
  name: FormFields.cost,
  rules: [{ required: true, message: ' ' }],
};

export const CostField: React.FC<CostFieldProps> = ({ editMode, expenseStatus }) => (
  <>
    <Form.Item {...costFormItemProps}>
      <InputNumber
        disabled={editMode && expenseStatus !== ExpenseStatus.InProgressRequesting}
        formatter={(value) => `${value} zł`}
        min={0}
        parser={(value) => value?.replace(letterRegex, '').trim() ?? ''}
      />
    </Form.Item>
  </>
);
