import React, { MouseEvent, useContext } from 'react';
import { FaReceipt } from 'react-icons/all';
import { navigate } from '@reach/router';
import { Button, List } from 'antd';

import { ExpenseStatus } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { paymentsRoute } from '../../navigation/routerConstants';
import { currency } from '../../utils/constants/currency';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { NotOptional } from '../../utils/types';
import { isPaymentActionable } from '../common/PaymentButtonCommon';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';

import style from './ExpenseView.module.less';

export interface ExpensePaymentProps {
  payment: ExpensePaymentsProps['payments'][0];
  userId: string | null;
  expense: NotOptional<ExpenseQueryType>;
}

export interface ExpensePaymentsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
  expense: NotOptional<ExpenseQueryType>;
}

const ListItem = ({ payment, userId, expense }: ExpensePaymentProps) => {
  const { id, paymentPayer, amount, status } = payment;
  const amountValue = amount !== null ? `${amount} ${currency}` : null;

  const handleListItemClick = () => navigate(`${paymentsRoute}/${id}`);
  const handlePayButtonClick = (e: MouseEvent<HTMLElement>) => {
    stopPropagation(e);

    return navigate(`${paymentsRoute}/${id}/makePayment`);
  };

  const paymentButtonVisible =
    paymentPayer.id === userId && isPaymentActionable(payment.status, expense.expenseStatus);

  return (
    <List.Item className={style.paymentsList} key={id} onClick={handleListItemClick}>
      <FaReceipt className={style.receiptIcon} size="1.6rem" />
      <div>
        <div>Od: {paymentPayer.name}</div>
        <div>{renderPaymentStatus(status)}</div>
      </div>
      <div className={style.amount}>
        {amountValue}
        {paymentButtonVisible && <Button onClick={handlePayButtonClick}>Opłać</Button>}
      </div>
    </List.Item>
  );
};

export const ExpensePayments: React.FC<ExpensePaymentsProps> = ({ payments, expense }) => {
  const { userId } = useContext(UserContext);

  return (
    <List
      dataSource={payments}
      renderItem={(payment) => <ListItem expense={expense} payment={payment} userId={userId} />}
      size="default"
    />
  );
};
