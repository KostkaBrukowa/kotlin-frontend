import { Optional } from '../types';

export const currency = 'zł';
export const formatMoney = (value: Optional<string | number>): string =>
  value ? `${value} ${currency}` : '';
