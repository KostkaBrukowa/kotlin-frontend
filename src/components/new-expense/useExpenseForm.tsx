import { navigate } from '@reach/router';
import { Form } from 'antd';
import { Moment } from 'moment';

import {
  PartyKind,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from '../../generated/graphql';
import { ExpenseRequestMapper } from '../mappers/expenses/ExpenseRequestMapper';
import { expensesRoute } from '../navigation/routerConstants';
import { useCreateExpense } from './graphql/useCreateExpense';
import { useEditExpenseData } from './useEditExpenseData';

export enum PartyType {
  EVENT = 'EVENT',
  GROUP = 'GROUP',
  FRIENDS = 'FRIENDS',
}

export enum FormFields {
  name = 'name',
  partyType = 'partyType',
  partyId = 'partyId',
  participantIds = 'participantIds',
  cost = 'cost',
  date = 'date',
  description = 'description',
}

export interface FormValues {
  [FormFields.name]: string | null;
  [FormFields.partyType]: PartyKind | null;
  [FormFields.partyId]: string | null;
  [FormFields.participantIds]: string[];
  [FormFields.cost]: string;
  [FormFields.description]: string;
  [FormFields.date]: Moment;
}

const expenseMapper = new ExpenseRequestMapper();

export const useExpenseForm = (expenseId: string | undefined) => {
  const [form] = Form.useForm<FormValues>();
  const editExpenseData = useEditExpenseData(expenseId);
  const [createExpense, { loading: createSubmitting }] = useCreateExpense();
  const [updateExpense, { loading: updateSubmitting }] = useUpdateExpenseMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      if (expenseId) {
        await updateExpense({
          variables: { expense: expenseMapper.toUpdateRequest(values, expenseId) },
        });
      } else {
        await createExpense({ variables: { expense: expenseMapper.toRequest(values) } });
      }

      await navigate(expensesRoute);
    } catch (e) {}
  };

  return {
    form,
    onSubmit,
    submitting: createSubmitting || updateSubmitting,
    editExpenseData,
  };
};
