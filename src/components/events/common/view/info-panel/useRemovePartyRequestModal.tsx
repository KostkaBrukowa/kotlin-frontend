import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Modal } from 'antd';

import { useRemovePartyRequest } from '../../../../utils/hooks/graphql/party-request/useRemovePartyRequest';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';

export interface ChangeExpenseModalProps {
  event: NotOptional<EventQueryType>;
}

export const useRemovePartyRequestModal = ({ event }: ChangeExpenseModalProps) => {
  const { removePartyRequest } = useRemovePartyRequest();

  const onRemovePartyRequest = async (partyRequesteeId: string): Promise<void> => {
    const partyRequest = event.partyPartyRequests.find(
      (it) => it.partyRequestReceiver.id === partyRequesteeId,
    );

    if (!partyRequest) return;

    await removePartyRequest(partyRequest?.id);
  };

  return (partyRequesteeId: string): void => {
    Modal.confirm({
      maskClosable: true,
      title: 'Usuwasz zaproszenie',
      icon: <ExclamationCircleOutlined />,
      content: 'Właśnie usuwasz zaproszenie użytkownika. Jesteś pewien że chcesz to zrobić?',
      onOk: () => onRemovePartyRequest(partyRequesteeId),
    });
  };
};
