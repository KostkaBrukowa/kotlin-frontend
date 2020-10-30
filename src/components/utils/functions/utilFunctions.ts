import { KeyboardEvent, MouseEvent } from 'react';

export const stopPropagation = <T>(e: MouseEvent<T>) => e.stopPropagation();
export const onKeyPress = <T>(e: KeyboardEvent<T>) => e.stopPropagation();

export const stopPropagations = {
  onClick: stopPropagation,
  onKeyPress,
};
