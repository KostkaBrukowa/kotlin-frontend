import React from 'react';
import { DatePicker, Form, TimePicker } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { PartyKind } from '../../../../generated/graphql';
import { TransitionElement } from '../../../utils/animations/TransitionElement';
import { FormFields, FormValues } from '../useEventForm';

import style from './Fields.module.less';

const dateFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Data rozpoczęcia',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

const timeFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'i godzina',
  name: FormFields.date,
  rules: [{ required: true, message: ' ' }],
};

export interface CostAndDateFieldsProps {
  form: FormInstance<FormValues>;
  initialValues: FormValues | undefined;
}

export const StartDateField: React.FC<CostAndDateFieldsProps> = ({ form, initialValues }) => {
  const { eventType } = form.getFieldsValue();
  const disabled = initialValues
    ? initialValues[FormFields.eventType] !== PartyKind.Event
    : eventType !== PartyKind.Event;

  return (
    <TransitionElement initialHeight="96px" visible={!disabled}>
      <div className={style.startDateTimeWrapper}>
        <Form.Item {...dateFormItemProps} className={style.pickerWrapper}>
          <DatePicker className={style.picker} disabled={disabled} placeholder="Wybierz datę" />
        </Form.Item>

        <Form.Item {...timeFormItemProps} className={style.pickerWrapper}>
          <TimePicker
            className={style.picker}
            disabled={disabled}
            format="HH:mm"
            placeholder="oraz czas"
          />
        </Form.Item>
      </div>
    </TransitionElement>
  );
};
