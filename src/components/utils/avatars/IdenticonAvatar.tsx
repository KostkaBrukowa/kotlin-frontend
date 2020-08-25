import React, { useMemo } from 'react';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';
import clsx from 'clsx';

import style from './IdenticonAvatar.module.less';

export interface AvatarProps {
  id: string | null;
  size: number;
  className?: string;
  wrapperClassName?: string;
}

const avatars = new Avatars(sprites);

export const IdenticonAvatar: React.FC<AvatarProps> = ({
  id,
  className,
  wrapperClassName,
  size,
}) => {
  const encodedAvatarSvg = useMemo(() => {
    if (!id) return '';

    const avatarSvg = avatars.create(id);

    return `url("data:image/svg+xml,${encodeURIComponent(avatarSvg)}")`;
  }, [id]);

  const effectiveWrapperClassName = clsx(style.wrapper, wrapperClassName);
  // const effectiveIconClassName = clsx(style.icon, className);

  return (
    <div className={effectiveWrapperClassName} style={{ width: size * 1.5, height: size * 1.5 }}>
      <div
        className={className}
        style={{ background: encodedAvatarSvg, width: size, height: size }}
      />
    </div>
  );
};
