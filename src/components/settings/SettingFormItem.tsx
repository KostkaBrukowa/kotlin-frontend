import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Divider, Form } from 'antd';

import { Optional } from '../utils/types';
import { fields, UserDetailsFormFields } from './FormFieldsConfig';

import style from './Settings.module.less';

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
  <>
    <Form.Item
      {...fields[type]}
      label={
        <>
          {fields[type].label}
          <Button
            className={style.editButton}
            icon={<EditOutlined />}
            size="small"
            onClick={() => onButtonClick(type)}
          />
        </>
      }
    >
      <div className={style.field}>
        <p>{currentValues[type]}</p>
      </div>
    </Form.Item>
    <Divider className={style.divider} />
  </>
);
