import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, InputNumber, Switch, Tooltip } from 'antd';
import { FormInstance } from 'antd/es/form';

import { Friends, useUserFriends } from '../../utils/hooks/graphql/friends/useUserFriends';
import { useRerender } from '../../utils/hooks/useRerender';
import { FormFields, FormValues } from '../useExpenseForm';

import style from './Fields.module.less';

export interface SplitFieldProps {
  form: FormInstance<FormValues>;
}

export interface SplitItemProps {
  participantId?: string;
  friends: Friends | undefined;
  currentUser?: boolean;
  form: FormInstance<FormValues>;
  sum: number;
  onChange(): void;
}

// {name: 0, key: 0, isListField: true, fieldKey: 0}

export const SplitItem: React.FC<SplitItemProps> = ({
  participantId,
  friends,
  currentUser,
  onChange,
  sum,
  form,
}) => {
  const friend = friends?.find((it) => it.id === participantId);
  const formItemName = `split${participantId ?? '0'}`;

  return (
    <Form.Item
      name={formItemName}
      rules={[
        {
          validator: async () => {
            if (currentUser && (sum < 100 || sum > 100)) {
              return Promise.reject(new Error('Suma musi być równa 100'));
            }
          },
        },
      ]}
    >
      <div className={style.paymentPartItem}>
        <InputNumber
          formatter={(value) => `${value}%`}
          max={100}
          min={0}
          parser={(value) => value?.replace('%', '') ?? ''}
          onChange={(value) => {
            form.setFieldsValue({ [formItemName]: value });
            onChange();
          }}
        />
        <span key={participantId}>{currentUser ? 'Ty' : friend?.name}</span>
      </div>
    </Form.Item>
  );
};

export const SplitField: React.FC<SplitFieldProps> = ({ form }) => {
  const [splitEqually, setSplitEqually] = useState(true);
  const { extractedData: friends, loading: friendsLoading } = useUserFriends();
  const tooltipTitle = 'Każdy uczestnik otrzyma taką samą część kwoty do zapłaty';
  const rerender = useRerender();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [percentSum, setPercentSum] = useState<number>(0);

  useEffect(() => {
    const formValues = form.getFieldsValue();

    const splitKeys = Object.keys(formValues).filter((it) => it.startsWith('split'));

    const calculatedSum: number = splitKeys.reduce((currentSum, key) => {
      const value = formValues[key];
      const filteredValue = typeof value === 'number' ? value : value?.replace('%', '') ?? 0;

      return currentSum + Number(filteredValue);
    }, 0);

    setPercentSum(calculatedSum);

    if (calculatedSum > 100) {
      setErrorMessage('Suma wynosi więcej niż 100%');
    } else if (calculatedSum < 100) {
      setErrorMessage('Suma wynosi mniej niż 100%');
    } else {
      setErrorMessage(null);
    }
  });

  return (
    <div className={style.splitField}>
      <div className={style.switchWrapper}>
        <Switch
          checked={splitEqually}
          // @ts-ignore
          id="123"
          onChange={() => setSplitEqually(!splitEqually)}
        />
        <label htmlFor="123" id="switch-label">
          Kwota rozdzielona po równo
        </label>
        <Tooltip className="data-cy-title" title={tooltipTitle}>
          <QuestionCircleOutlined aria-label={tooltipTitle} tabIndex={0} />
        </Tooltip>
      </div>
      {!splitEqually && !friendsLoading && (
        <>
          <div className={style.paymentsWrapper}>
            <SplitItem currentUser form={form} friends={[]} sum={percentSum} onChange={rerender} />
            {form.getFieldValue(FormFields.participantIds)?.map((participantId: any) => (
              <SplitItem
                form={form}
                friends={friends}
                key={participantId}
                participantId={participantId}
                sum={percentSum}
                onChange={rerender}
              />
            ))}
          </div>
          <p>
            Suma: {percentSum}%.{' '}
            <span role="alert" style={{ color: '#b82f36' }}>
              {errorMessage}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
