import React, { useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Form } from 'antd';

import { AuthData } from '../config/authentication/useAuthentication';
import { friendsRoute } from '../navigation/routerConstants';
import { Optional } from '../utils/types';
import { EditUserDetailModal } from './EditUserDetailModal';
import { UserDetailsFormFields } from './FormFieldsConfig';
import { LogoutFormItem } from './LogoutFormItem';
import { SettingFormItem } from './SettingFormItem';
import { useUserDetails } from './useUserDetails';

import style from './Settings.module.less';

export interface SettingsProps extends RouteComponentProps {
  setAuthData(authData: AuthData): void;
}

export const UserView: React.FC<SettingsProps> = ({ setAuthData }) => {
  const { extractedData: user, dataComponent } = useUserDetails();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetailsTypeToEdit, setUserDetailsTypeToEdit] = useState(UserDetailsFormFields.name);

  if (dataComponent !== null) return dataComponent;

  const onEditButtonClick = (field: UserDetailsFormFields) => {
    setUserDetailsTypeToEdit(field);
    setModalVisible(true);
  };

  const currentValues: Record<UserDetailsFormFields, Optional<string>> = {
    [UserDetailsFormFields.name]: user?.name,
    [UserDetailsFormFields.bankAccount]: user?.bankAccount,
    [UserDetailsFormFields.email]: user?.email,
  };

  return (
    <div>
      <div className={style.headerWrapper}>
        <h2>Twoje dane:</h2>
        <LogoutFormItem setAuthData={setAuthData} />
      </div>

      <div className={style.wrapper}>
        <EditUserDetailModal
          currentValue={currentValues[userDetailsTypeToEdit]}
          currentValues={currentValues}
          open={modalVisible}
          type={userDetailsTypeToEdit}
          onClose={() => setModalVisible(false)}
        />

        <Form className={style.form} component="div">
          <SettingFormItem
            currentValues={currentValues}
            type={UserDetailsFormFields.name}
            onButtonClick={onEditButtonClick}
          />

          <SettingFormItem
            currentValues={currentValues}
            type={UserDetailsFormFields.bankAccount}
            onButtonClick={onEditButtonClick}
          />

          <SettingFormItem
            currentValues={currentValues}
            type={UserDetailsFormFields.email}
            onButtonClick={onEditButtonClick}
          />

          <Button onClick={() => navigate(friendsRoute)}>Twoi znajomi</Button>
        </Form>
      </div>
    </div>
  );
};