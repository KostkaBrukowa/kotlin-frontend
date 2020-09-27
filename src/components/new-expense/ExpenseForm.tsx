import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Form, Input } from 'antd';
import moment from 'moment';

import { EditExpenseDataQuery } from '../../generated/graphql';
import { validateMessages } from '../utils/form/validationMessages';
import { dateFrom } from '../utils/functions/date';
import { useRerender } from '../utils/hooks/useRerender';
import { NotOptional } from '../utils/types';
import { CostAndDateFields } from './fields/CostAndDateFields';
import { DescriptionField } from './fields/DescriptionField';
import { ExpenseParticipantsSelectField } from './fields/ExpenseParticipantsSelectField';
import { ExpenseTypeField } from './fields/ExpenseTypeField';
import { GroupIdSelectField } from './fields/GroupIdSelectField';
import { NameField } from './fields/NameField';
import { SaveExpenseButton } from './SaveExpenseButton';
import { FormValues, partyKindToPartyType, useExpenseForm } from './useExpenseForm';

import style from './NewExpense.module.less';

interface RouteParams {
  expenseId?: string;
}

export type ExpenseFormProps = RouteComponentProps<RouteParams>;

const getInitialValues = (
  expense?: EditExpenseDataQuery['getSingleExpense'],
): FormValues | undefined => {
  if (!expense) return;

  return {
    cost: expense.amount.toString(),
    description: expense.description,
    participantIds: expense.expensePayments.map((it) => it.paymentPayer.id),
    date: moment(dateFrom(expense.expenseDate)),
    name: expense.name,
    partyType: partyKindToPartyType(expense.expenseParty.type),
    partyId: expense.expenseParty.id,
  };
};

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ expenseId }) => {
  const editMode = Boolean(expenseId);
  const {
    form,
    onSubmit,
    submitting,
    editExpenseData: { extractedData, dataComponent },
  } = useExpenseForm(expenseId);
  const rerender = useRerender();
  const initialValues = getInitialValues(extractedData);

  if ((dataComponent !== null || !extractedData) && editMode) return dataComponent;

  return (
    <div className={style.wrapper}>
      <Form
        colon={false}
        form={form}
        initialValues={initialValues}
        layout="horizontal"
        validateMessages={validateMessages}
        onFinish={onSubmit}
      >
        <NameField />

        <ExpenseTypeField editMode={editMode} form={form} rerender={rerender} />

        <GroupIdSelectField editMode={editMode} form={form} rerender={rerender} />

        <ExpenseParticipantsSelectField editMode={editMode} form={form} rerender={rerender} />

        <CostAndDateFields editMode={editMode} expenseStatus={extractedData?.expenseStatus} />

        <DescriptionField />

        <SaveExpenseButton
          editMode={editMode}
          form={form}
          initialValues={initialValues}
          submitting={submitting}
        />
      </Form>
    </div>
  );
};
