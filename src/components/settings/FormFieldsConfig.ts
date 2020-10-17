import { FormItemProps } from 'antd/es/form';

export enum UserDetailsFormFields {
  name = 'name',
  bankAccount = 'bankAccount',
  email = 'email',
}

export const fields: Record<UserDetailsFormFields, Omit<FormItemProps, 'children'>> = {
  [UserDetailsFormFields.name]: {
    rules: [
      { required: true, message: 'Podaj swoje imię' },
      { min: 3, message: 'Imię musi mieć więcej niż 3 znaki.' },
    ],
    name: UserDetailsFormFields.name,
    label: 'Twoje imię: ',
    colon: false,
  },
  [UserDetailsFormFields.bankAccount]: {
    rules: [{ min: 26, max: 26, message: 'Numer konta musi mieć dokładnie 26 znaków.' }],
    name: UserDetailsFormFields.bankAccount,
    label: 'Twój numer konta: ',
    colon: false,
  },
  [UserDetailsFormFields.email]: {
    rules: [
      { required: true, message: 'Podaj swój email' },
      { type: 'email', message: 'Podaj prawidłowy email' },
    ],
    name: UserDetailsFormFields.email,
    label: 'Twój email: ',
    colon: false,
  },
};
