import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { useLoginUserMutation } from '../../generated/graphql';
import { LoginProps } from './Login';
import { friendsRoute } from '../navigation/routerConstants';

export enum FormFields {
  login = 'login',
  password = 'password',
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
  form: FormInstance;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
} = ({ setJwtToken, tokenPresent }) => {
  const [form] = Form.useForm();
  const [login, { loading }] = useLoginUserMutation();

  const onSubmit = async (values: FormValues) => {
    const { login: email, password } = values;

    const jwtToken = await login({ variables: { input: { email, password } } });

    if (jwtToken.data?.logIn) {
      setJwtToken(jwtToken.data?.logIn);
    }
  };

  useEffect(() => {
    if (tokenPresent) navigate(friendsRoute);
  }, [tokenPresent]);

  return {
    form,
    onSubmit,
    loading,
  };
};
