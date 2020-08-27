import React from 'react';
import { navigate } from '@reach/router';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { Optional } from '../../utils/types';

import style from './ParticipantList.module.less';

const participantWrapperClassName = clsx(style.participantWrapper, 'data-cy-participant-wrapper');

export interface ParticipantListProps {
  participants: Optional<Array<{ id: string; name?: string | null }>>;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => (
  <div className={style.participantsWrapper}>
    {participants?.map(({ id, name }) => (
      <div
        className={participantWrapperClassName}
        key={id}
        onClick={() => navigate(`/users/${id}`)}
      >
        <IdenticonAvatar id={id} size={20} />
        {name}
      </div>
    ))}
  </div>
);
