import React, { useContext, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { CheckCircleOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';

import { UserContext } from '../../config/UserProvider';
import {
  TransitionElement,
  TransitionElementProps,
} from '../../utils/animations/TransitionElement';
import { NotOptional } from '../../utils/types';
import { EventQueryType } from './useSingleEvent';

import style from './EventView.module.less';

export interface JoinEventButtonProps {
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

export const JoinEventButton: React.FC<JoinEventButtonProps> = ({ event }) => {
  const { userId } = useContext(UserContext);
  const [joined, setJoined] = useState(false);
  const userJoinedEvent = event.partyParticipants.some((participant) => participant.id === userId);

  return (
    <Button
      className={style.joinButton}
      icon={<AnimatedIcon visible={joined} />}
      size="large"
      type={joined ? 'primary' : 'default'}
      onClick={() => setJoined(!joined)}
    >
      Wezmę udział
    </Button>
  );
};
