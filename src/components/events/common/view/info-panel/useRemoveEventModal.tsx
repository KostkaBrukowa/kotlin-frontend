import React from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { navigate } from '@reach/router';
import { Modal } from 'antd';

import { eventsRoute } from '../../../../navigation/routerConstants';
import { useRemoveEvent } from './graphql/useRemoveEvent';

export const useRemoveEventModal = () => {
  const { removeEvent } = useRemoveEvent();

  return (eventId: string) => {
    Modal.confirm({
      maskClosable: true,
      okText: 'Usuń',
      cancelText: 'Anuluj',
      title: 'Usuwasz wydarzenie.',
      icon: <ExclamationCircleOutlined />,
      content: 'Czy na pewno chcesz usunąć to wydarzenie? Nie będzie można go później przywrócić.',
      onOk: async () => {
        await removeEvent(eventId);
        await navigate(eventsRoute);
      },
    });
  };
};
