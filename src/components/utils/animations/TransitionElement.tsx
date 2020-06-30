import React from 'react';
import { animated, useTransition } from 'react-spring';

export interface TransitionElementProps {
  initialHeight: string;
  visible?: boolean;
  className?: string;
}

export const TransitionElement: React.FC<TransitionElementProps> = ({
  visible,
  className,
  initialHeight,
  children,
}) => {
  const transitions = useTransition(visible, null, {
    initial: { opacity: visible ? 1 : 0, height: visible ? initialHeight : '0px' },
    from: { opacity: 0, height: '0px' },
    enter: { opacity: 1, height: initialHeight },
    leave: { opacity: 0, height: '0px' },
  });

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
