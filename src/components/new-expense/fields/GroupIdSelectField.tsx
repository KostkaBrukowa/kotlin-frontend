import React from 'react';
import { Form, Select } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';

import { PartyKind } from '../../../generated/graphql';
import { TransitionElement } from '../../utils/animations/TransitionElement';
import { FormFields, FormValues } from '../useExpenseForm';
import { useNewExpenseEvents } from '../useNewExpenseEvents';

const formItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Wybierz grupę:',
  name: FormFields.partyId,
};

export interface GroupIdSelectFieldProps {
  form: FormInstance<FormValues>;
  editMode: boolean;

  rerender(): void;
}

export const GroupIdSelectField: React.FC<GroupIdSelectFieldProps> = ({
  rerender,
  form,
  editMode,
}) => {
  const { partyType } = form.getFieldsValue() as FormValues;
  const { extractedData: parties, loading } = useNewExpenseEvents(partyType);

  const visible = partyType === PartyKind.Friends || partyType === undefined;

  return (
    <TransitionElement initialHeight="96px" visible={!visible}>
      <Form.Item {...formItemProps}>
        <Select
          disabled={editMode}
          filterOption={(inputValue, option) =>
            parties?.find((it) => it.id === option?.key)?.name?.includes(inputValue) ?? false
          }
          loading={loading}
          notFoundContent={<NameNotFound />}
          onChange={rerender}
        >
          {parties?.map((it) => (
            <Select.Option key={it.id} value={it.id}>
              {it.name ?? ''}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </TransitionElement>
  );
};

const NameNotFound: React.FC = () => (
  <>
    <h3>Pusto...</h3>
    <p>Nie ma żadnej grupy o takiej nazwie</p>
  </>
);
