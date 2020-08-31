import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/all';
import { navigate } from '@reach/router';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';

import style from './ElementHeader.module.less';

const AVATAR_SIZE = 40;

export interface ElementHeaderProps {
  id: string | null;
  className?: string;
}

export const ElementHeader: React.FC<ElementHeaderProps> = ({ id, className }) => (
  <div className={clsx(style.headerWrapper, className)}>
    <AiOutlineArrowLeft size="18px" onClick={() => navigate(-1)} />
    <div className={style.mainInfoWrapper}>
      <IdenticonAvatar id={id || null} size={AVATAR_SIZE} />
    </div>
  </div>
);
