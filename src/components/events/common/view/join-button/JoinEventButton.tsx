import React, { useContext, useState } from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { Button } from 'antd';

import { UserContext } from '../../../../config/UserProvider';
import { TransitionElement } from '../../../../utils/animations/TransitionElement';
import { useAcceptPartyRequest } from '../../../../utils/hooks/graphql/party-request/useAcceptPartyRequest';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
import { useLeaveParty } from './graphql/useLeaveParty';
import { useLeavePartyModal } from './useLeavePartyModal';

import style from '../../../event/view/EventView.module.less';

export interface JoinEventButtonProps {
  text?: string;
  event: NotOptional<EventQueryType>;
}

const AnimatedIcon: React.FC<{ visible: boolean }> = ({ visible }) => {
  const transitionOptions = {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
  };

  return (
    <TransitionElement className={style.animatedIcon} options={transitionOptions} visible={visible}>
      <CheckCircleOutlined color="green" />
    </TransitionElement>
  );
};

const JoinEventButton: React.FC<JoinEventButtonProps> = ({ event, text }) => {
  const { userId } = useContext(UserContext);
  const openLeavePartyModal = useLeavePartyModal(event);
  const userJoinedEvent = event.partyParticipants.some((participant) => participant.id === userId);
  const userPartyRequest = event.partyPartyRequests.find(
    (partyRequest) => partyRequest.partyRequestReceiver.id === userId,
  );
  const { acceptPartyRequest, loading } = useAcceptPartyRequest();
  const disabled = event?.owner?.id === userId;

  const onButtonClick = async (): Promise<void> => {
    if (userJoinedEvent) {
      openLeavePartyModal();

      return;
    }

    if (userPartyRequest) {
      await acceptPartyRequest(userPartyRequest.id);
    }
  };

  if (!userPartyRequest && !userJoinedEvent) {
    return null;
  }

  return (
    <Button
      className={style.joinButton}
      disabled={disabled}
      icon={<AnimatedIcon visible={userJoinedEvent} />}
      loading={loading}
      size="large"
      type={userJoinedEvent ? 'primary' : 'default'}
      onClick={onButtonClick}
    >
      {disabled ? 'Jesteś założycielem' : text}
    </Button>
  );
};

JoinEventButton.defaultProps = {
  text: 'Wezmę udział',
};

export { JoinEventButton };
