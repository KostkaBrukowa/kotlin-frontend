import React from 'react';
import { Button } from 'antd';

import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { useRemoveEventModal } from './useRemoveEventModal';

import style from '../../../event/view/EventView.module.less';

export interface RemoveEventButtonProps {
  event: NotOptional<EventQueryType>;
}

export const RemoveEventButton: React.FC<RemoveEventButtonProps> = ({ event: { id } }) => {
  const openRemoveEventModal = useRemoveEventModal();

  return (
    <div className={style.deleteButtonWrapper}>
      <Button
        danger
        className={style.deleteButton}
        type="primary"
        onClick={() => openRemoveEventModal(id)}
      >
        Usuń
      </Button>
    </div>
  );
};
