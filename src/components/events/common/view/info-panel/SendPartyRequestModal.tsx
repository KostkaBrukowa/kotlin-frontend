import React from 'react';
import { useLocation } from '@reach/router';
import { Form, Modal, Select } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';

import { PartyRequestStatus } from '../../../../../generated/graphql';
import { validateMessages } from '../../../../utils/form/validationMessages';
import { useUserFriends } from '../../../../utils/hooks/graphql/friends/useUserFriends';
import { useSendPartyRequest } from '../../../../utils/hooks/graphql/party-request/useSendPartyRequest';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';

import style from '../../../../new-expense/fields/Fields.module.less';

export interface AddFriendModalProps {
  open: boolean;
  event: NotOptional<EventQueryType>;

  onClose: () => void;
}

const FRIEND = 'FRIEND';

const friendEmailFieldProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz użytkownika',
  name: FRIEND,
  rules: [{ required: true }, { type: 'string' }],
};

export const SendPartyRequestModal: React.FC<AddFriendModalProps> = ({ open, onClose, event }) => {
  const [form] = useForm();
  const { sendPartyRequest, loading: sending } = useSendPartyRequest(event.id);
  const { extractedData: friends, loading } = useUserFriends();
  const title = 'Dodaj znajomego';

  const friendsThatAreNotInParty = friends
    ?.filter(
      (friend) => !event.partyParticipants.some((participant) => participant.id === friend.id),
    )
    ?.filter(
      (friend) =>
        !event.partyPartyRequests
          .filter((partyRequest) => partyRequest.status === PartyRequestStatus.InProgress)
          .some((partyRequest) => partyRequest.partyRequestReceiver.id === friend.id),
    );

  const handleOk = async () => {
    try {
      await form.validateFields();
      await sendPartyRequest(form.getFieldValue(FRIEND));
      form.setFieldsValue({ [FRIEND]: '' });

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
        <Form.Item {...friendEmailFieldProps}>
          <Select
            disabled={false}
            filterOption={(inputValue, option) =>
              friends?.find((it) => it.id === option?.key)?.name.includes(inputValue) ?? false
            }
            loading={loading}
            notFoundContent={<NameNotFound />}
          >
            {friendsThatAreNotInParty?.map((it) => (
              <Select.Option className={style.option} key={it.id} value={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>
      Nie ma żadnego uczestnika o takim imieniu lub każdy znajomy o takiej nazwie dołączył już do
      wydarzenia
    </p>
  </>
);
