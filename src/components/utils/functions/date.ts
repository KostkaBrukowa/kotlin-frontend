// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import plLocale from 'date-fns/locale/pl';

const POSTFIX_LOCATION_LENGTH = '[Europe/Warsaw]'.length;
const DEFAULT_DATE_FORMAT = 'dd LLL y';

export function dateFrom(date: string) {
  return new Date(date.substring(0, date.length - POSTFIX_LOCATION_LENGTH));
}

export const formatDate = (date: Date, formatDisplay?: string) =>
  format(date, formatDisplay ?? DEFAULT_DATE_FORMAT, {
    locale: plLocale,
  });
