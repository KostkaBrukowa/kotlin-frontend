import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Modal } from 'antd';

import { useDeclinePartyRequest } from '../../utils/hooks/graphql/party-request/useDeclinePartyRequest';

export const useDeclinePartyRequestModal = (partyRequestId: string) => {
  const { declinePartyRequest } = useDeclinePartyRequest();

  return (): void => {
    Modal.confirm({
      okText: 'Odrzuć',
      cancelText: 'Anuluj',
      maskClosable: true,
      title: 'Odrzuć zaproszenie',
      icon: <ExclamationCircleOutlined />,
      content: 'Właśnie odrzucasz zaproszenie. Jesteś pewien że chcesz to zrobić?',
      onOk: () => declinePartyRequest(partyRequestId),
    });
  };
};
