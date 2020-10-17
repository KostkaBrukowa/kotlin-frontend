import React from 'react';
import AiOutlineArrowLeft from '@ant-design/icons/ArrowLeftOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { navigate } from '@reach/router';
import { Button } from 'antd';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';

import style from './ElementHeader.module.less';

const AVATAR_SIZE = 40;

export interface ElementHeaderProps {
  id: string | null;
  className?: string;

  onEdit?(): void;
}

export const ElementHeader: React.FC<ElementHeaderProps> = ({ id, className, onEdit }) => (
  <div className={clsx(style.headerWrapper, className)}>
    <AiOutlineArrowLeft className={style.arrow} onClick={() => navigate(-1)} />
    <div className={style.mainInfoWrapper}>
      <IdenticonAvatar id={id || null} size={AVATAR_SIZE} />
    </div>
    <Button className={style.editButton} icon={<EditOutlined />} onClick={onEdit}>
      Edytuj
    </Button>
  </div>
);