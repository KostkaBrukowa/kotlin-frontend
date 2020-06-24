import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { FormItemProps } from 'antd/es/form';
import { RouteComponentProps } from '@reach/router';
import style from './Login.module.less';
import { FormFields, useLogin } from './useLogin';

export interface LoginProps extends RouteComponentProps {
  tokenPresent: boolean;

  setJwtToken(token: string | null): void;
}

const fields: Record<FormFields, Omit<FormItemProps, 'children'>> = {
  [FormFields.login]: {
    rules: [{ required: true, message: 'Podaj email' }],
    name: FormFields.login,
    label: 'Email',
  },
  [FormFields.password]: {
    rules: [{ required: true, message: 'Podaj hasło' }],
    name: FormFields.password,
    label: 'Hasło',
  },
  [FormFields.remember]: {
    name: FormFields.remember,
    valuePropName: 'checked',
  },
};

export const Login: React.FC<LoginProps> = (props) => {
  const { onSubmit, form } = useLogin(props);

  return (
    <div className={style.wrapper}>
      <Form
        className={style.form}
        form={form}
        initialValues={{ remember: true, login: 'admin@gmail.com', password: 'admin' }}
        onFinish={onSubmit}
      >
        <Form.Item {...fields.login}>
          <Input />
        </Form.Item>

        <Form.Item {...fields.password}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...fields.remember}>
          <Checkbox>Zapamiętaj</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button className={style.button} htmlType="submit" type="primary">
            Zaloguj
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
