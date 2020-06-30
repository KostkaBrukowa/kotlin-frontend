import React, { ReactNode } from 'react';
import { animated, useTransition } from 'react-spring';

export interface ChangeElementProps {
  firstElement: ReactNode;
  secondElement: ReactNode;
  wrapperClassName?: string;
  firstElementActive: boolean;
}

export const ChangeElement: React.FC<ChangeElementProps> = ({
  firstElement,
  secondElement,
  firstElementActive,
  wrapperClassName,
}) => {
  const transitions = useTransition(firstElementActive, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div className={wrapperClassName} key={key} style={props}>
            {firstElement}
          </animated.div>
        ) : (
          <animated.div className={wrapperClassName} key={key} style={props}>
            {secondElement}
          </animated.div>
        ),
      )}
    </>
  );
};
