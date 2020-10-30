import React from 'react';
import AiOutlineArrowLeft from '@ant-design/icons/ArrowLeftOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { navigate } from '@reach/router';
import { Button } from 'antd';
import clsx from 'clsx';

import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { Optional } from '../../utils/types';

import style from './ElementHeader.module.less';

export const AVATAR_SIZE = 40;

export interface ElementHeaderProps {
  id: Optional<string>;
  className?: string;

  onEdit?(): void;
}

export const ElementHeader: React.FC<ElementHeaderProps> = ({ id, className, onEdit }) => {
  const handleGoBack = () => navigate(-1);

  return (
    <div className={clsx(style.headerWrapper, className)}>
      <Button
        className={style.arrowButton}
        icon={<AiOutlineArrowLeft className={style.arrow} />}
        onClick={handleGoBack}
      />

      <div className={style.mainInfoWrapper}>
        <IdenticonAvatar id={id || null} size={AVATAR_SIZE} />
      </div>
      {onEdit && (
        <Button className={style.editButton} icon={<EditOutlined />} onClick={onEdit}>
          Edytuj
        </Button>
      )}
    </div>
  );
};
