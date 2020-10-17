import React from 'react';
import { navigate } from '@reach/router';
import { Button, Form, message } from 'antd';

import { useLogoutMutation } from '../../generated/graphql';
import { AuthData } from '../config/authentication/useAuthentication';
import { loginRoute } from '../navigation/routerConstants';

import style from './Settings.module.less';

interface LogoutFormItemProps {
  setAuthData(authData: AuthData): void;
}

export const LogoutFormItem: React.FC<LogoutFormItemProps> = ({ setAuthData }) => {
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    console.log('logging out');
    await logout();
    setAuthData({ userId: null, jwtToken: null });
    await navigate(loginRoute);
    message.info('Zostałeś wylogowany');
  };

  return (
    <Form.Item>
      <Button danger className={style.button} type="primary" onClick={onLogout}>
        Wyloguj
      </Button>
    </Form.Item>
  );
};