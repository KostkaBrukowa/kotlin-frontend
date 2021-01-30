import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Modal } from 'antd';

import { useRemovePartyParticipant } from '../../../../utils/hooks/graphql/party-participant/useRemovePartyParticipant';

export const useRemoveParticipantModal = () => {
  const { removePartyParticipant } = useRemovePartyParticipant();

  return (eventId: string, userId: string): void => {
    Modal.confirm({
      maskClosable: true,
      okText: 'Usuń',
      cancelText: 'Anuluj',
      title: 'Usuwasz uczestnika',
      icon: <ExclamationCircleOutlined />,
      content: 'Właśnie usuwasz uczestnika ze swojej imprezy. Jesteś pewien że chcesz to zrobić?',
      onOk: () => removePartyParticipant(eventId, userId),
    });
  };
};
