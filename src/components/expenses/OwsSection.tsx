import React, { useContext, useRef } from 'react';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import clsx from 'clsx';

import { ActionType, AppContext, OwsType } from '../app-context/AppContext';
import { AnimatedNumber } from '../utils/animations/AnimatedNumber';
import { currency } from '../utils/constants/currency';

import style from './OwsSection.module.less';

const isFocused = (div: HTMLDivElement | null): boolean | null =>
  div && div === document.activeElement;

export interface OwsSectionProps {
  amount: number | undefined;
  type: OwsType;
}

const userOwsProps = {
  className: style.owsUser,
  title: 'Inni wiszą tobie:',
  icon: <PlusCircleOutlined />,
};

const owsUserProps = {
  className: style.userOws,
  title: 'Ty wisisz w sumie:',
  icon: <MinusCircleOutlined />,
};

export const OwsSection: React.FC<OwsSectionProps> = ({ amount, type }) => {
  const {
    state: { currentOwsType },
    dispatch,
  } = useContext(AppContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { className, title, icon } = type === OwsType.USER_OWS ? owsUserProps : userOwsProps;
  const active = currentOwsType === type;

  const handleClick = () =>
    dispatch({ type: ActionType.CHANGE_OWS_TYPE, payload: { currentOwsType: type } });

  return (
    <div
      aria-checked={active}
      className={clsx(`data-cy-ows-${type}`, className, { [style.owsActive]: active })}
      ref={wrapperRef}
      role="switch"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === ' ' && isFocused(wrapperRef.current) && handleClick()}
    >
      {icon}
      <h4 className={style.owsTitle}>{title}</h4>
      <div className={style.currency}>
        <AnimatedNumber amount={amount} /> {currency}
      </div>
    </div>
  );
};
