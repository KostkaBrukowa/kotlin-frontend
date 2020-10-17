import React, { useEffect } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Optional } from '../utils/types';
import { fields, UserDetailsFormFields } from './FormFieldsConfig';

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

  useEffect(() => {
    if (open) form.setFields([{ name: type, value: currentValue }]);
  }, [open]);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onClose();
  };

  const handleOk = async () => {
    try {
      await form.validateFields();

      onClose();
    } catch (e) {
      message.info('Błędny formularz.');
    }
  };

  return (
    <Modal title={title} visible={open} onCancel={handleCancel} onOk={handleOk}>
      <Form form={form} initialValues={currentValues} preserve={false}>
        <Form.Item {...fields[type]} label={label}>
          <Input allowClear autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const getModalTitle = (type: UserDetailsFormFields, currentValue: Optional<string>) => {
  switch (type) {
    case UserDetailsFormFields.name:
      return `: ${currentValue}`;
    case UserDetailsFormFields.email:
      return `Email: ${currentValue}`;
    case UserDetailsFormFields.bankAccount:
      return `Numer konta: ${currentValue}`;
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
