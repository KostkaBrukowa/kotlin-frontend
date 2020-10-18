import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Modal } from 'antd';

import { useRemovePartyRequest } from '../../utils/hooks/graphql/party-request/useRemovePartyRequest';

export const useRemovePartyRequestModal = (partyRequestId: string) => {
  const { removePartyRequest } = useRemovePartyRequest();

  return (): void => {
    Modal.confirm({
      maskClosable: true,
      title: 'Usuwasz uczestnika',
      icon: <ExclamationCircleOutlined />,
      content:
        'Właśnie usuwasz zaproszenie. Aby uczestniczyć w wydarzeniu będziesz potrzebował' +
        ' nowego zaproszenia. Jesteś pewien że chcesz to zrobić?',
      onOk: () => removePartyRequest(partyRequestId),
    });
  };
};
