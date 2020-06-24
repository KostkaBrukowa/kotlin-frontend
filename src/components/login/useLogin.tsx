import { FormInstance } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { message } from 'antd';
import { useLoginUserMutation } from '../../generated/graphql';
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

export const useLogin: (
  props: LoginProps,
) => {
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
} = ({ setJwtToken, tokenPresent, register }) => {
  const [login, { loading: loggingLoading }] = useLoginUserMutation();
  const [signUp, { loading: registerLoading }] = useLoginUserMutation();

  const onSubmit = async (values: FormValues) => {
    const { login: email, password } = values;
    const mutation = register ? signUp : login;

    const jwtToken = await mutation({ variables: { input: { email, password } } });

    if (jwtToken.data?.logIn) {
      setJwtToken(jwtToken.data?.logIn);
    } else {
      message.warning('Nieprawidłowe email lub hasło :(');
    }
  };

  useEffect(() => {
    if (tokenPresent) navigate(friendsRoute);
  }, [tokenPresent]);

  return {
    onSubmit,
    loading: loggingLoading || registerLoading,
  };
};
