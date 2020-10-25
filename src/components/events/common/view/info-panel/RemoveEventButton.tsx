import React, { useContext } from 'react';
import { Button } from 'antd';

import { PartyKind } from '../../../../../generated/graphql';
import { UserContext } from '../../../../config/UserProvider';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { useRemoveEventModal } from './useRemoveEventModal';

import style from '../../../event/view/EventView.module.less';

export interface RemoveEventButtonProps {
  event: NotOptional<EventQueryType>;
}

export const RemoveEventButton: React.FC<RemoveEventButtonProps> = ({
  event: { id, owner, type },
}) => {
  const { userId } = useContext(UserContext);
  const openRemoveEventModal = useRemoveEventModal();

  if (userId !== owner?.id || type === PartyKind.Friends) {
    return null;
  }

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
