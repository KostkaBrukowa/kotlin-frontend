import React from 'react';
import { DatePicker, Form, InputNumber, TimePicker } from 'antd';
import { FormItemProps } from 'antd/es/form';
import moment from 'moment';

import { ExpenseStatus } from '../../../generated/graphql';
import { FormFields } from '../useExpenseForm';

import style from '../NewExpense.module.less';

const letterRegex = /\p{General_Category=Letter}/gu;

const costFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Ile zapłaciłeś:',
  name: FormFields.cost,
  rules: [{ required: true, message: ' ' }],
};

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

export interface CostAndDateFieldsProps {
  expenseStatus?: ExpenseStatus;
  editMode: boolean;
}

export const CostAndDateFields: React.FC<CostAndDateFieldsProps> = ({
  editMode,
  expenseStatus,
}) => {
  const now = moment();

  return (
    <div>
      <Form.Item {...costFormItemProps}>
        <InputNumber
          disabled={editMode && expenseStatus !== ExpenseStatus.InProgressRequesting}
          formatter={(value) => `${value} zł`}
          min={0}
          parser={(value) => value?.replace(letterRegex, '').trim() ?? ''}
        />
      </Form.Item>

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
