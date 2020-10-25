import React, { useContext, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Form } from 'antd';

import { AuthData } from '../config/authentication/useAuthentication';
import { UserContext } from '../config/UserProvider';
import { friendsRoute } from '../navigation/routerConstants';
import { IdenticonAvatar } from '../utils/avatars/IdenticonAvatar';
import { Optional } from '../utils/types';
import { EditUserDetailModal } from './EditUserDetailModal';
import { UserDetailsFormFields } from './FormFieldsConfig';
import { LogoutFormItem } from './LogoutFormItem';
import { SettingFormItem } from './SettingFormItem';
import { UserViewItem } from './UserViewItem';
import { useUserDetails } from './graphql/useUserDetails';

import style from './Settings.module.less';

export interface SettingsProps extends RouteComponentProps {
  setAuthData(authData: AuthData): void;
}

export const CurrentUserView: React.FC<SettingsProps> = ({ setAuthData }) => {
  const { userId } = useContext(UserContext);
  const { extractedData: user, dataComponent } = useUserDetails(userId);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetailsTypeToEdit, setUserDetailsTypeToEdit] = useState(UserDetailsFormFields.name);

  if ((dataComponent !== null && !user) || !user) return dataComponent;

  const handleEditButtonClick = (field: UserDetailsFormFields) => {
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
      </div>

      <div className={style.wrapper}>
        <EditUserDetailModal
          currentValue={currentValues[userDetailsTypeToEdit]}
          currentValues={currentValues}
          open={modalVisible}
          type={userDetailsTypeToEdit}
          onClose={() => setModalVisible(false)}
        />

        <Form className={style.form} component="div" layout="horizontal" requiredMark={false}>
          <SettingFormItem
            currentValues={currentValues}
            type={UserDetailsFormFields.name}
            onButtonClick={handleEditButtonClick}
          />

          <SettingFormItem
            currentValues={currentValues}
            type={UserDetailsFormFields.bankAccount}
            onButtonClick={handleEditButtonClick}
          />

          <SettingFormItem currentValues={currentValues} type={UserDetailsFormFields.email} />

          <UserViewItem title="Twoi znajomi" onClick={() => navigate(friendsRoute)} />
          <LogoutFormItem setAuthData={setAuthData} />
        </Form>
      </div>
    </div>
  );
};
