import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from '@reach/router';
import { Button, Checkbox, Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';
import clsx from 'clsx';

import { registerRoute } from '../navigation/routerConstants';
import { TransitionElement } from '../utils/animations/TransitionElement';
import { singleViewStyle } from '../utils/components/ViewStyles';
import { validateMessages } from '../utils/form/validationMessages';
import { OtherOption } from './OtherOption';
import { FormFields, LoginProps, useLogin } from './useLogin';

import style from './Login.module.less';

const fields: Record<FormFields, Omit<FormItemProps, 'children'>> = {
  [FormFields.login]: {
    rules: [{ required: true }, { type: 'email' }],
    name: FormFields.login,
    label: 'Email',
  },
  [FormFields.name]: {
    rules: [{ required: true }],
    name: FormFields.name,
    label: 'Imię i nazwisko',
  },
  [FormFields.password]: {
    rules: [{ required: true }],
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
  const submitButtonTitle = register ? 'Zarejestruj się' : 'Zaloguj się';
  const minMd = useMediaQuery({ minWidth: 768 });

  return (
    <div className={style.wrapper} style={singleViewStyle}>
      <Form
        className={style.form}
        form={form}
        initialValues={{
          // todo remove
          remember: true,
          login: 'admin@gmail.com',
          password: 'admin123',
          repeatedPassword: 'admin123',
        }}
        layout="vertical"
        size={minMd ? 'large' : 'middle'}
        validateMessages={validateMessages}
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

        <TransitionElement className="data-cy-name" initialHeight="96px" visible={register}>
          <Form.Item {...fields.name}>
            <Input />
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
