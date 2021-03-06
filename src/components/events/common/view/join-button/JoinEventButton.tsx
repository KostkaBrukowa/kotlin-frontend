import React, { useContext } from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { Button } from 'antd';

import { PartyRequestStatus } from '../../../../../generated/graphql';
import { UserContext } from '../../../../config/UserProvider';
import { TransitionElement } from '../../../../utils/animations/TransitionElement';
import { useAcceptPartyRequest } from '../../../../utils/hooks/graphql/party-request/useAcceptPartyRequest';
import { EventQueryType } from '../../../../utils/hooks/graphql/singleEvent/useSingleEvent';
import { NotOptional } from '../../../../utils/types';
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
    (partyRequest) =>
      partyRequest.partyRequestReceiver.id === userId &&
      partyRequest.status === PartyRequestStatus.InProgress,
  );
  const { acceptPartyRequest, loading } = useAcceptPartyRequest();
  const currentUserIsOwner = event?.owner?.id === userId;

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
      disabled={currentUserIsOwner}
      icon={<AnimatedIcon visible={userJoinedEvent} />}
      loading={loading}
      size="large"
      type={userJoinedEvent ? 'primary' : 'default'}
      onClick={onButtonClick}
    >
      {currentUserIsOwner ? 'Jesteś założycielem' : userJoinedEvent ? text : 'Chcę wziąć udział'}
    </Button>
  );
};

JoinEventButton.defaultProps = {
  text: 'Opuść',
};

export { JoinEventButton };
