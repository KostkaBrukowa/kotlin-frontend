import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RouteComponentProps } from '@reach/router';
import { Form } from 'antd';
import moment from 'moment';

import { EditExpenseDataQuery } from '../../generated/graphql';
import { singleViewStyle } from '../utils/components/ViewStyles';
import { validateMessages } from '../utils/form/validationMessages';
import { dateFrom } from '../utils/functions/date';
import { useRerender } from '../utils/hooks/useRerender';
import { CostAndDateFields } from './fields/CostAndDateFields';
import { DescriptionField } from './fields/DescriptionField';
import { ExpenseParticipantsSelectField } from './fields/ExpenseParticipantsSelectField';
import { ExpenseTypeField } from './fields/ExpenseTypeField';
import { GroupIdSelectField } from './fields/GroupIdSelectField';
import { NameField } from './fields/NameField';
import { SaveExpenseButton } from './SaveExpenseButton';
import { FormValues, useExpenseForm } from './useExpenseForm';

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
    partyType: expense.expenseParty.type,
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
  const minMd = useMediaQuery({ minWidth: 768 });

  if (((dataComponent !== null && !extractedData) || !extractedData) && editMode) {
    return dataComponent;
  }

  return (
    <div className={style.wrapper} style={singleViewStyle}>
      <Form
        scrollToFirstError
        colon={false}
        form={form}
        initialValues={initialValues}
        layout="vertical"
        size={minMd ? 'large' : 'middle'}
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
