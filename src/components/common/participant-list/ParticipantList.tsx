import React from 'react';
import { navigate } from '@reach/router';
import { Spin } from 'antd';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { Optional } from '../../utils/types';

import style from './ParticipantList.module.less';

const participantWrapperClassName = clsx(style.participantWrapper, 'data-cy-participant-wrapper');

export interface ParticipantListProps {
  notFoundContent?: React.ReactNode;
  participants: Optional<Array<{ id: string; name?: string | null }>>;
  loading?: boolean;
}

// @ts-ignore
export const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  loading,
  notFoundContent,
}) => {
  if (loading) {
    return (
      <div className={style.spin}>
        <Spin />
      </div>
    );
  }

  if (participants?.length === 0) {
    return notFoundContent || <NameNotFound />;
  }

  return (
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
};

const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>Brak użytkowników</p>
  </>
);
