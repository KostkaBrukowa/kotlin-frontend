import { Store } from 'antd/es/form/interface';

export enum PartyType {
  EVENT,
  GROUP,
  FRIENDS,
}

export enum FormFields {
  name = 'Nazwa wydatku',
  partyType = 'partyType',
  partyId = 'partyId',
  participantIds = 'participantIds',
  cost = 'cost',
  date = 'date',
  description = 'description',
}

export interface FormValues extends Store {
  [FormFields.name]: string | null;
  [FormFields.partyType]: PartyType | null;
  [FormFields.partyId]: string | null;
  [FormFields.participantIds]: string[];
  [FormFields.cost]: string;
}
export const useNewExpenseForm = () => ({});
