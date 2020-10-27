// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import plLocale from 'date-fns/locale/pl';

import { Optional } from '../types';

const DEFAULT_DATE_FORMAT = 'dd LLL y';

export function dateFrom(date?: string) {
  return date ? new Date(date.substring(0, date.lastIndexOf('['))) : new Date();
}

export const formatDate = (date: Optional<Date>, formatDisplay?: string) =>
  date
    ? format(date, formatDisplay ?? DEFAULT_DATE_FORMAT, {
        locale: plLocale,
      })
    : '-';

export const getDayOfTheWeek = (date: Date) =>
  format(date, 'iiii', {
    locale: plLocale,
  });
