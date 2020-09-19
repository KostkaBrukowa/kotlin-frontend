import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { validateMessages } from '../utils/form/validationMessages';
import { useRerender } from '../utils/hooks/useRerender';
import { CostAndDateFields } from './fields/CostAndDateFields';
import { DescriptionField } from './fields/DescriptionField';
import { ExpenseParticipantsSelectField } from './fields/ExpenseParticipantsSelectField';
import { ExpenseTypeField } from './fields/ExpenseTypeField';
import { GroupIdSelectField } from './fields/GroupIdSelectField';
import { NameField } from './fields/NameField';
import { FormValues } from './useNewExpenseForm';

import style from './NewExpense.module.less';

export type NewExpenseProps = RouteComponentProps;

export const NewExpenseForm: React.FC<NewExpenseProps> = (props) => {
  const [form] = useForm<FormValues>();
  const rerender = useRerender();

  console.log('Form.getFieldsValue()', form.getFieldsValue());

  return (
    <div className={style.wrapper}>
      <Form colon={false} form={form} layout="horizontal" validateMessages={validateMessages}>
        <NameField />

        <ExpenseTypeField form={form} rerender={rerender} />

        <GroupIdSelectField form={form} rerender={rerender} />

        <ExpenseParticipantsSelectField form={form} rerender={rerender} />

        <CostAndDateFields form={form} />

        <DescriptionField />

        <Button
          className={style.submitButton}
          size="large"
          type="primary"
          onClick={() => {
            form.validateFields();
            rerender();
          }}
        >
          Utwórz wydatek
        </Button>
      </Form>
    </div>
  );
};
