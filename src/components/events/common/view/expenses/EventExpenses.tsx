import React, { useContext } from 'react';
import { FaWallet } from 'react-icons/all';
import { navigate } from '@reach/router';
import { Collapse, List, Tooltip, Typography } from 'antd';
import clsx from 'clsx';

import { UserContext } from '../../../../config/UserProvider';
import { getExpenseTooltipProps } from '../../../../enum-renderers/expenseTooltipRenderer';
import { expensesRoute } from '../../../../navigation/routerConstants';
import { currency } from '../../../../utils/constants/currency';
import { capitalize } from '../../../../utils/functions/string';
import { stopPropagation } from '../../../../utils/functions/utilFunctions';
import { NotOptional } from '../../../../utils/types';
import { EmptyEventsList } from '../../EmptyList';
import { EventQueryType } from '../useSingleEvent';

import style from './EventExpenses.module.less';

export interface ExpensePaymentProps {
  payment: EventExpensesProps['payments'][0];
  userId: string | null;
}

export interface EventExpensesProps {
  payments: NotOptional<EventQueryType>['partyExpenses'];
}

const { Text } = Typography;

const ListItem = ({ payment, userId }: ExpensePaymentProps) => {
  const { id, amount, expensePayer, description, name } = payment;
  const amountValue = amount !== null ? `${amount} ${currency}` : null;

  const handleListItemClick = () => navigate(`${expensesRoute}/${id}`);
  // const handleListItemClick = () => {};

  return (
    <List.Item className={style.paymentsList} key={id} onClick={handleListItemClick}>
      <FaWallet className={style.receiptIcon} size="1.6rem" />

      <div>
        {name}
        <div className={style.description}>{capitalize(description)}</div>
        <div>Od: {expensePayer.name}</div>
      </div>
      <Text type="success">{amountValue}</Text>
    </List.Item>
  );
};

export const EventExpenses: React.FC<EventExpensesProps> = ({ payments }) => {
  const { userId } = useContext(UserContext);

  return (
    <List
      dataSource={payments}
      locale={{ emptyText: <EmptyEventsList type="wydatków" /> }}
      renderItem={(payment) => <ListItem payment={payment} userId={userId} />}
      size="default"
    />
  );
};
