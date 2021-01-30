import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { navigate } from '@reach/router';
import { Modal } from 'antd';

import { eventsRoute } from '../../../../navigation/routerConstants';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { useLeaveParty } from './graphql/useLeaveParty';

export const useLeavePartyModal = (event: NotOptional<EventQueryType>) => {
  const { leaveParty } = useLeaveParty();

  return () => {
    Modal.confirm({
      okText: 'Opuść',
      cancelText: 'Anuluj',
      maskClosable: true,
      title: 'Opuszczasz wydarzenie.',
      icon: <ExclamationCircleOutlined />,
      content:
        'Czy na pewno chcesz opuścić wydarzenie? Nie będziesz mógł do niego ponownie' +
        ' dołączyć bez zaproszenia',
      onOk: async () => {
        await leaveParty(event.id);
        await navigate(eventsRoute);
      },
    });
  };
};
