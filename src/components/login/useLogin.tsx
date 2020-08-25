import { useEffect } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';
import { FormInstance } from 'antd/lib/form';

import {
  LoginUserMutationResult,
  SignUpUserMutationResult,
  useLoginUserMutation,
  useSignUpUserMutation,
} from '../../generated/graphql';
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
  remember = 'remember',
}

interface FormValues extends Store {
  [FormFields.login]: string;
  [FormFields.password]: string;
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

  const onSubmit = async (values: FormValues) => {
    const { login: email, password } = values;
    const mutation = register ? signUp : login;

    try {
      const response = await mutation({ variables: { input: { email, password } } });

      const data = (response as LoginUserMutationResult | null)?.data?.logIn
        ? (response as LoginUserMutationResult | null)?.data?.logIn
        : (response as SignUpUserMutationResult | null)?.data?.signUp;

      if (data) {
        setAuthData({ jwtToken: data.token, userId: data.userId });
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
