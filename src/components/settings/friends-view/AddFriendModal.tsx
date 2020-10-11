import React from 'react';
import { Form, Input, Modal } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';

import { validateMessages } from '../../utils/form/validationMessages';
import { useAddFriend } from './graphql/useAddFriend';

export interface AddFriendModalProps {
  open: boolean;
  onClose: () => void;
}

const EMAIL_FIELD_NAME = 'FRIEND_EMAIL';

const friendEmailFieldProps: Omit<FormItemProps, 'children'> = {
  label: 'Email użytkownika:',
  name: EMAIL_FIELD_NAME,
  rules: [{ required: true }, { type: 'email' }],
};

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ open, onClose }) => {
  const [form] = useForm();
  const { addFriend, loading } = useAddFriend();
  const title = 'Dodaj znajomego';

  const handleOk = async () => {
    try {
      await form.validateFields();
      await addFriend(form.getFieldValue(EMAIL_FIELD_NAME));

      onClose();
    } catch (e) {}
  };

  return (
    <Modal
      destroyOnClose
      okButtonProps={{ loading }}
      title={title}
      visible={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form colon={false} form={form} preserve={false} validateMessages={validateMessages}>
        <Form.Item {...friendEmailFieldProps} label="Podaj email użytkownika:">
          <Input allowClear autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
