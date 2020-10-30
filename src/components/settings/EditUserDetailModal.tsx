import React, { useEffect } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Optional } from '../utils/types';
import { fields, UserDetailsFormFields } from './FormFieldsConfig';
import { useEditUserData } from './graphql/useEditUserData';

export interface EditUserDetailModalProps {
  open: boolean;
  type: UserDetailsFormFields;
  currentValue: Optional<string>;
  currentValues: Record<UserDetailsFormFields, Optional<string>>;

  onClose(): void;
}

export const EditUserDetailModal: React.FC<EditUserDetailModalProps> = ({
  onClose,
  open,
  type,
  currentValue,
  currentValues,
}) => {
  const [form] = useForm();
  const title = getModalTitle(type, currentValue);
  const label = getModalLabel(type);
  const { editUserData } = useEditUserData();

  useEffect(() => {
    if (open) form.setFields([{ name: type, value: currentValue }]);
  }, [currentValue, form, open, type]);

  const handleOk = async () => {
    try {
      await form.validateFields();

      if (type === UserDetailsFormFields.name) {
        await editUserData(form.getFieldValue(UserDetailsFormFields.name), null);
      } else {
        await editUserData(null, form.getFieldValue(UserDetailsFormFields.bankAccount));
      }

      onClose();
    } catch (e) {
      message.info('Błędny formularz.');
    }
  };

  return (
    <Modal title={title} visible={open} onCancel={onClose} onOk={handleOk}>
      <Form form={form} initialValues={currentValues} preserve={false}>
        <Form.Item {...fields[type]} label={label}>
          <Input allowClear autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const getModalTitle = (type: UserDetailsFormFields, currentValue: Optional<string>) => {
  const value = currentValue ?? 'brak';

  switch (type) {
    case UserDetailsFormFields.name:
      return `Imię: ${value}`;
    case UserDetailsFormFields.email:
      return `Email: ${value}`;
    case UserDetailsFormFields.bankAccount:
      return `Numer konta: ${value}`;
    default:
      return '';
  }
};

const getModalLabel = (type: UserDetailsFormFields) => {
  switch (type) {
    case UserDetailsFormFields.name:
      return 'Nowe imię:';
    case UserDetailsFormFields.email:
      return 'Nowy email:';
    case UserDetailsFormFields.bankAccount:
      return 'Nowy numer konta:';
    default:
      return '';
  }
};
