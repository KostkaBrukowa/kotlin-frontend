import React from 'react';
import { Button, Form } from 'antd';
import style from './Settings.module.less';
import { Optional } from '../utils/types';
import { fields, UserDetailsFormFields } from './FormFieldsConfig';

export interface SettingFormItemProps {
  type: UserDetailsFormFields;
  currentValues: Record<UserDetailsFormFields, Optional<string>>;

  onButtonClick(type: UserDetailsFormFields): void;
}

export const SettingFormItem: React.FC<SettingFormItemProps> = ({
  type,
  onButtonClick,
  currentValues,
}) => (
  <Form.Item {...fields[type]}>
    <div className={style.field}>
      <p>{currentValues[type]}</p>
      <Button size="small" onClick={() => onButtonClick(type)}>
        Edytuj
      </Button>
    </div>
  </Form.Item>
);
