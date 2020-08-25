import React, { CSSProperties } from 'react';
import { animated, useTransition } from 'react-spring';
import { UseTransitionProps } from 'react-spring/web';

export interface TransitionElementProps {
  initialHeight?: string;
  visible?: boolean;
  className?: string;
  options?: UseTransitionProps<unknown, CSSProperties>;
}

export const TransitionElement: React.FC<TransitionElementProps> = ({
  visible,
  className,
  initialHeight,
  children,
  options,
}) => {
  const transitions = useTransition(
    visible,
    null,
    options ?? {
      initial: { opacity: visible ? 1 : 0, height: visible ? initialHeight ?? 0 : '0px' },
      from: { opacity: 0, height: '0px' },
      enter: { opacity: 1, height: initialHeight ?? 0 },
      leave: { opacity: 0, height: '0px' },
    },
  );

  return (
    <>
      {transitions.map(
        ({ item, key, props: animatedProps }) =>
          item && (
            <animated.div className={className} key={key} style={animatedProps}>
              {children}
            </animated.div>
          ),
      )}
    </>
  );
};
