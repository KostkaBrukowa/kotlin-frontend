import React, { useContext, MouseEvent } from 'react';
import { Button, List } from 'antd';
import { FaReceipt } from 'react-icons/all';
import { navigate } from '@reach/router';
import style from './ExpenseView.module.less';
import { ExpenseQueryType } from './useSingleExpenseQuery';
import { NotOptional } from '../../utils/types';
import { UserContext } from '../../config/UserProvider';
import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { currency } from '../../utils/constants/currency';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { paymentsRoute } from '../../navigation/routerConstants';

export interface ExpensePaymentProps {
  payment: ExpensePaymentsProps['payments'][0];
  userId: string | null;
}

export interface ExpensePaymentsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
}

const ListItem = ({ payment, userId }: ExpensePaymentProps) => {
  const { id, paymentPayer, amount, status } = payment;
  const amountValue = amount !== null ? `${amount} ${currency}` : null;

  const handleListItemClick = () => navigate(`${paymentsRoute}/${id}`);
  const handlePayButtonClick = (e: MouseEvent<HTMLElement>) => {
    stopPropagation(e);

    return navigate(`${paymentsRoute}/${id}/pay`);
  };

  return (
    <List.Item className={style.paymentsList} key={id} onClick={handleListItemClick}>
      <FaReceipt className={style.receiptIcon} size="1.6rem" />
      <div>
        <div>Od: {paymentPayer.name}</div>
        <div>{renderPaymentStatus(status)}</div>
      </div>
      <div className={style.amount}>
        {amountValue}
        {paymentPayer.id === userId && <Button onClick={handlePayButtonClick}>Opłać</Button>}
        {/* todo check for statuses */}
      </div>
    </List.Item>
  );
};

export const ExpensePayments: React.FC<ExpensePaymentsProps> = ({ payments }) => {
  const { userId } = useContext(UserContext);

  return (
    <List
      dataSource={payments}
      renderItem={(payment) => <ListItem payment={payment} userId={userId} />}
      size="default"
    />
  );
};
