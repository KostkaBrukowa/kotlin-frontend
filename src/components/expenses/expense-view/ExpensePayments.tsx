import React from 'react';
import { Button, Collapse, List } from 'antd';
import { FaReceipt } from 'react-icons/all';
import style from './ExpenseView.module.less';

export interface ExpensePaymentsProps {}

export const ExpensePayments: React.FC<ExpensePaymentsProps> = ({}) => (
  <List
    dataSource={[1, 2, 3]}
    renderItem={(item) => (
      <List.Item className={style.paymentsList} key={item}>
        <FaReceipt className={style.receiptIcon} size="1.6rem" />
        <div>
          <div>Jarek zapłacił 30.33</div>
          <div>Status: Zapłacone</div>
        </div>
        {item === 1 && <Button>Opłać</Button>}
      </List.Item>
    )}
    size="default"
  />
);
