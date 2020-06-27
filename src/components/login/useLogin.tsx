import { Store } from 'antd/es/form/interface';
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormInstance } from 'antd/lib/form';
import {
  LoginUserMutationResult,
  SignUpUserMutationResult,
  useLoginUserMutation,
  useSignUpUserMutation,
} from '../../generated/graphql';
import { LoginProps } from './Login';
import { friendsRoute } from '../navigation/routerConstants';

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

const onErrorOption = () => message.warning('Nieprawidłowe email lub hasło :(');

export const useLogin: (
  props: LoginProps,
  register: boolean,
) => {
  form: FormInstance;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
} = ({ setJwtToken, tokenPresent }, register) => {
  const [form] = useForm();
  const [login, { loading: loggingLoading }] = useLoginUserMutation();
  const [signUp, { loading: registerLoading }] = useSignUpUserMutation();

  const onSubmit = async (values: FormValues) => {
    const { login: email, password } = values;
    const mutation = register ? signUp : login;

    try {
      const response = await mutation({ variables: { input: { email, password } } });

      const token = (response as LoginUserMutationResult | null)?.data?.logIn
        ? (response as LoginUserMutationResult | null)?.data?.logIn
        : (response as SignUpUserMutationResult | null)?.data?.signUp;

      if (token) {
        setJwtToken(token);
      } else {
        form.resetFields([FormFields.repeatedPassword, FormFields.password]);
        message.warning('Nieprawidłowe email lub hasło :(');
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (tokenPresent) navigate(friendsRoute);
  }, [tokenPresent]);

  return {
    form,
    onSubmit,
    loading: loggingLoading || registerLoading,
  };
};
