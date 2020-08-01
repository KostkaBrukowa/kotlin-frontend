import React, { useContext } from 'react';
import { Button, List } from 'antd';
import { FaReceipt } from 'react-icons/all';
import style from './ExpenseView.module.less';
import { ExpenseQueryType } from './useSingleExpenseQuery';
import { NotOptional } from '../../utils/types';
import { UserContext } from '../../config/UserProvider';
import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { currency } from '../../utils/constants/currency';

export interface ExpensePaymentsProps {
  payments: NotOptional<ExpenseQueryType>['expensePayments'];
}

export const ExpensePayments: React.FC<ExpensePaymentsProps> = ({ payments }) => {
  const { userId } = useContext(UserContext);

  return (
    <List
      dataSource={payments}
      renderItem={({ status, paymentPayer, id, amount }) => (
        <List.Item className={style.paymentsList} key={id}>
          <FaReceipt className={style.receiptIcon} size="1.6rem" />
          <div>
            <div>Od: {paymentPayer.name}</div>
            <div>Status: {renderPaymentStatus(status)}</div>
          </div>
          <div className={style.amount}>
            {amount !== null ? `${amount} ${currency}` : null}
            {paymentPayer.id === userId && <Button>Opłać</Button>} {/* todo check for statuses */}
          </div>
        </List.Item>
      )}
      size="default"
    />
  );
};
