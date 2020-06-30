import React from 'react';
import { animated, useSpring } from 'react-spring';
import clsx from 'clsx';
import style from './AnimatedNumber.module.less';

export interface AnimatedCurrencyProps {
  amount?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedCurrencyProps> = ({ amount, className }) => {
  const animatedData = useSpring({ number: amount ?? 0, from: { number: 0 } });

  return (
    <animated.span className={clsx(className)}>
      {animatedData.number.interpolate((it: number) => `${it.toFixed(2)}`)}
    </animated.span>
  );
};
