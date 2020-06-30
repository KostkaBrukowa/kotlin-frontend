import { MouseEvent } from 'react';

export const stopPropagation = <T>(e: MouseEvent<T>) => e.stopPropagation();
