import { useEffect } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';
import { FormInstance } from 'antd/lib/form';

import { useLoginUserMutation, useSignUpUserMutation, } from '../../generated/graphql';
import { AuthData } from '../config/authentication/useAuthentication';
import { expensesRoute } from '../navigation/routerConstants';

export interface LoginProps extends RouteComponentProps {
  tokenPresent: boolean;

  setAuthData(authData: AuthData): void;
}

export enum FormFields {
  login = 'login',
  password = 'password',
  repeatedPassword = 'repeatedPassword',
  name = 'name',
  remember = 'remember',
}

interface FormValues extends Store {
  [FormFields.login]: string;
  [FormFields.password]: string;
  [FormFields.name]: string;
  [FormFields.remember]: boolean;
}

export const useLogin: (
  props: LoginProps,
  register: boolean,
) => {
  form: FormInstance;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
} = ({ setAuthData, tokenPresent }, register) => {
  const [form] = useForm();
  const [login, { loading: loggingLoading }] = useLoginUserMutation();
  const [signUp, { loading: registerLoading }] = useSignUpUserMutation();

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ variables: { input: { email, password } } });

    return response.data?.logIn;
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    const response = await signUp({ variables: { input: { email, password, name } } });

    return response.data?.signUp;
  };

  const onSubmit = async (values: FormValues) => {
    const { login: email, password, name } = values;

    try {
      const mutationResult = register
        ? await handleSignUp(email, password, name)
        : await handleLogin(email, password);

      if (mutationResult) {
        setAuthData({ jwtToken: mutationResult.token, userId: mutationResult.userId });
      } else {
        form.resetFields([FormFields.repeatedPassword, FormFields.password]);
        message.warning('Nieprawidłowe email lub hasło :(');
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (tokenPresent) navigate(expensesRoute);
  }, [tokenPresent]);

  return {
    form,
    onSubmit,
    loading: loggingLoading || registerLoading,
  };
};
