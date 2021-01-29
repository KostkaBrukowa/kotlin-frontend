import React from 'react';
import { DatePicker, Form, TimePicker } from 'antd';
import { FormItemProps } from 'antd/es/form';
import moment from 'moment';

import { FormFields } from '../useExpenseForm';

import style from '../NewExpense.module.less';

const dateFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Data zapłaty',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

const timeFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'I godzina',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

export const DateFields: React.FC = () => {
  const now = moment();

  return (
    <div>
      <div className={style.dateTime}>
        <Form.Item {...dateFormItemProps} className={style.pickerWrapper}>
          <DatePicker
            className={style.timeInput}
            disabledDate={(date) => now.add(1, 'day').isBefore(date)}
            placeholder="Wybierz datę"
          />
        </Form.Item>

        <Form.Item {...timeFormItemProps} className={style.pickerWrapper}>
          <TimePicker className={style.timeInput} format="HH:mm" placeholder="oraz czas" />
        </Form.Item>
      </div>
    </div>
  );
};
