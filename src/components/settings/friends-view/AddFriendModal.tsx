import React from 'react';
import { useLocation } from '@reach/router';
import { Form, Input, message, Modal } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';

import { validateMessages } from '../../utils/form/validationMessages';
import { useMount } from '../../utils/hooks/useMount';
import { useAddFriend } from './graphql/useAddFriend';

export interface AddFriendModalProps {
  open: boolean;

  onOpen: () => void;
  onClose: () => void;
}

const EMAIL_FIELD_NAME = 'FRIEND_EMAIL';

const friendEmailFieldProps: Omit<FormItemProps, 'children'> = {
  label: 'Email użytkownika:',
  name: EMAIL_FIELD_NAME,
  rules: [{ required: true }, { type: 'email' }],
};

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ open, onClose, onOpen }) => {
  const [form] = useForm();
  const location = useLocation();
  const { addFriend, loading } = useAddFriend();
  const title = 'Dodaj znajomego';

  useMount(() => {
    const email = new URLSearchParams(location.search).get('email');

    if (email) {
      form.setFieldsValue({ [EMAIL_FIELD_NAME]: email });
      onOpen();
    }
  });

  const handleOk = async () => {
    try {
      await form.validateFields();
      await addFriend(form.getFieldValue(EMAIL_FIELD_NAME));
      form.setFieldsValue({ [EMAIL_FIELD_NAME]: '' });

      message.success('Dodano znajomego.');
      onClose();
    } catch (e) {}
  };

  return (
    <Modal
      destroyOnClose
      cancelText="Anuluj"
      okButtonProps={{ loading }}
      okText="Dodaj"
      title={title}
      visible={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form preserve colon={false} form={form} validateMessages={validateMessages}>
        <Form.Item {...friendEmailFieldProps} label="Podaj email użytkownika:">
          <Input
            allowClear
            autoComplete="off"
            onKeyPress={(e) => e.key === 'Enter' && handleOk()}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
