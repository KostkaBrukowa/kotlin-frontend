import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import style from './Settings.module.less';

export interface UserViewItemProps {
  title: string;
  onClick: () => void;
}

export const UserViewItem: React.FC<UserViewItemProps> = ({ title, onClick }) => {
  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    console.log('E.key', e.key);

    if (e.key === ' ' || e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <>
      <div
        className={style.userViewItemWrapper}
        role="link"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onKeyPress}
      >
        {title}
        <RightOutlined />
      </div>
      <Divider className={style.userViewItemDivider} />
    </>
  );
};
