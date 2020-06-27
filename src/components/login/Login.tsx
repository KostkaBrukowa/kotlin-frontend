import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { FormItemProps } from 'antd/es/form';
import { RouteComponentProps, useLocation } from '@reach/router';
import clsx from 'clsx';
import style from './Login.module.less';
import { FormFields, useLogin } from './useLogin';
import { OtherOption } from './OtherOption';
import { TransitionElement } from '../utils/animations/TransitionElement';
import { registerRoute } from '../navigation/routerConstants';

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
  [FormFields.repeatedPassword]: {
    rules: [
      { required: true, message: 'Powtórz hasło' },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }

          return Promise.reject('Hasła nie są identyczne');
        },
      }),
    ],
    name: FormFields.repeatedPassword,
    label: 'Powtórz hasło',
    dependencies: ['password'],
    validateTrigger: 'onBlur',
  },
  [FormFields.remember]: {
    name: FormFields.remember,
    valuePropName: 'checked',
  },
};

export const Login: React.FC<LoginProps> = (props) => {
  const location = useLocation();
  const register = location.pathname.includes(registerRoute);
  const { onSubmit, loading, form } = useLogin(props, register);
  const submitButtonTitle = register ? 'Zajerestruj się' : 'Zaloguj się';

  return (
    <div className={style.wrapper}>
      <Form
        className={style.form}
        form={form}
        initialValues={{
          remember: true,
          login: 'admin@gmail.com',
          password: 'admin',
          repeatedPassword: 'admin',
        }}
        onFinish={onSubmit}
      >
        <Form.Item {...fields.login}>
          <Input className="data-cy-login" />
        </Form.Item>

        <Form.Item {...fields.password}>
          <Input.Password className="data-cy-password" />
        </Form.Item>

        <TransitionElement
          className="data-cy-repeat-password"
          initialHeight="96px"
          visible={register}
        >
          <Form.Item {...fields.repeatedPassword}>
            <Input.Password />
          </Form.Item>
        </TransitionElement>

        <Form.Item {...fields.remember}>
          <Checkbox>Zapamiętaj</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className={clsx(style.button, 'data-cy-submit')}
            htmlType="submit"
            loading={loading}
            type="primary"
          >
            {submitButtonTitle}
          </Button>
        </Form.Item>
        <OtherOption register={register} />
      </Form>
    </div>
  );
};
