import React from 'react';
import { Form, Radio } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { renderPartyKind } from '../../../enum-renderers/partyKindEnumRenderer';
import { EventType, FormFields, FormValues } from '../useEventForm';

import style from './Fields.module.less';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Rodzaj:',
  name: FormFields.eventType,
  rules: [{ required: true }],
};

export interface ExpenseTypeFieldProps {
  form: FormInstance<FormValues>;
  editMode: boolean;

  rerender(): void;
}

export const EventTypeField: React.FC<ExpenseTypeFieldProps> = ({ form, rerender, editMode }) => {
  const onChange = (): void => {
    rerender();
  };

  return (
    <Form.Item {...formItemProps}>
      {editMode ? (
        <Radio.Group
          className={style.editTypeSelectionWrapper}
          disabled={editMode}
          onChange={onChange}
        >
          <Radio.Button disabled className={style.typeSelection} value={EventType.EVENT}>
            {renderPartyKind(form.getFieldValue(FormFields.eventType))}
          </Radio.Button>
        </Radio.Group>
      ) : (
        <Radio.Group className={style.typeSelectionWrapper} disabled={editMode} onChange={onChange}>
          <Radio.Button className={style.typeSelection} value={EventType.EVENT}>
            Wydarzenie
          </Radio.Button>
          <Radio.Button className={style.typeSelection} value={EventType.GROUP}>
            Grupa
          </Radio.Button>
        </Radio.Group>
      )}
    </Form.Item>
  );
};
