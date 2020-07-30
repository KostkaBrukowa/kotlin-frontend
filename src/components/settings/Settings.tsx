import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Form } from 'antd';
import style from './Settings.module.less';
import { useUserDetails } from './useUserDetails';
import { AuthData } from '../config/authentication/useAuthentication';
import { EditUserDetailModal } from './EditUserDetailModal';
import { SettingFormItem } from './SettingFormItem';
import { Optional } from '../utils/types';
import { LogoutFormItem } from './LogoutFormItem';
import { UserDetailsFormFields } from './FormFieldsConfig';

export interface SettingsProps extends RouteComponentProps {
  setAuthData(authData: AuthData): void;
}

export const Settings: React.FC<SettingsProps> = ({ setAuthData }) => {
  const { extractedData: user, dataComponent } = useUserDetails();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetailsTypeToEdit, setUserDetailsTypeToEdit] = useState(UserDetailsFormFields.name);

  if (dataComponent !== null) return dataComponent ?? null;

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
        </Form>
      </div>
    </div>
  );
};
