import React from 'react';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import clsx from 'clsx';
import style from './TotalBalance.module.less';

export enum OwsType {
  USER_OWS,
  OWS_USER,
}

export interface OwsSectionProps {
  amount: number;
  type: OwsType;
  activeOwsSection: OwsType | null;

  onClick(owsSection: OwsType | null): void;
}

export const OwsSection: React.FC<OwsSectionProps> = ({
  activeOwsSection,
  amount,
  type,
  onClick,
}) => {
  const className = type === OwsType.OWS_USER ? style.owsUser : style.userOws;
  const title = type === OwsType.OWS_USER ? 'Inni wiszą tobie:' : 'Ty wisisz w sumie:';
  const active = activeOwsSection === type;

  const handleClick = () => {
    onClick(activeOwsSection === type ? null : type);
  };

  return (
    <div className={clsx(className, { [style.owsActive]: active })} onClick={handleClick}>
      <MinusCircleOutlined />
      <h4 className={style.owsTitle}>{title}</h4>
      <p>12,45 zl</p>
    </div>
  );
};
