import React from 'react';
import { Form, Radio } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { FormFields, FormValues, PartyType } from '../useExpenseForm';

import style from '../NewExpense.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Rodzaj wydatku:',
  name: FormFields.partyType,
};

export interface ExpenseTypeFieldProps {
  form: FormInstance<FormValues>;
  editMode: boolean;

  rerender(): void;
}

export const ExpenseTypeField: React.FC<ExpenseTypeFieldProps> = ({ form, rerender, editMode }) => {
  const onChange = (): void => {
    rerender();
    form.resetFields([FormFields.partyId, FormFields.participantIds]);
  };

  return (
    <Form.Item {...formItemProps}>
      <Radio.Group className={style.typeSelectionWrapper} disabled={editMode} onChange={onChange}>
        <Radio.Button className={style.typeSelection} value={PartyType.EVENT}>
          Wydarzenie
        </Radio.Button>
        <Radio.Button className={style.typeSelection} value={PartyType.GROUP}>
          Grupa
        </Radio.Button>
        <Radio.Button className={style.typeSelection} value={PartyType.FRIENDS}>
          Znajomi
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
