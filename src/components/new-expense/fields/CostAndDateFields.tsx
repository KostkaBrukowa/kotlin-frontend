import React from 'react';
import { DatePicker, Form, InputNumber, TimePicker } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { currency } from '../../utils/constants/currency';
import { FormFields, FormValues } from '../useNewExpenseForm';

import style from '../NewExpense.module.less';

const letterRegex = /\p{General_Category=Letter}/gu;

const costFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Ile zapłaciłeś:',
  name: FormFields.cost,
  rules: [{ required: true, message: ' ' }],
};

const dateFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Kiedy zapłaciłeś:',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

const timeFormItemProps: Omit<FormItemProps, 'children'> = {
  label: '',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

export interface CostAndDateFieldsProps {
  form: FormInstance<FormValues>;
}

export const CostAndDateFields: React.FC<CostAndDateFieldsProps> = ({ form }) => (
  <div className={style.cashSection}>
    <Form.Item {...costFormItemProps}>
      <InputNumber
        formatter={(value) => `${value} zł`}
        min={0}
        parser={(value) => value?.replace(letterRegex, '').trim() ?? ''}
      />
    </Form.Item>

    <div className={style.dateTime}>
      <Form.Item {...dateFormItemProps}>
        <DatePicker placeholder="Wybierz datę" />
      </Form.Item>

      <Form.Item {...timeFormItemProps} className={style.date}>
        <TimePicker format="HH:mm" placeholder="oraz czas" />
      </Form.Item>
    </div>
  </div>
);
