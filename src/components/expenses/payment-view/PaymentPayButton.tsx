import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { useLocation } from '@reach/router';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from './useSinglePaymentQuery';
import style from './PaymentView.module.less';
import { UserContext } from '../../config/UserProvider';
import { capitalize } from '../../utils/functions/string';
import { currency } from '../../utils/constants/currency';

export interface PaymentPayButtonProps {
  payment: NotOptional<PaymentQueryType>;
}

export const PaymentPayButton: React.FC<PaymentPayButtonProps> = ({ payment }) => {
  const { userId } = useContext(UserContext);
  const location = useLocation();

  const receiverName = capitalize(payment.paymentExpense.expensePayer.name);
  const modalContent = `Właśnie potwierdzasz, że oddałeś ${receiverName} kwotę w wysokości ${payment.amount} ${currency}.`;

  const handlePaymentPay = () =>
    new Promise((resolve, reject) => {
      setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    }).catch(() => console.log('Oops errors!'));

  const showPromiseModal = () => {
    Modal.confirm({
      title: 'Rozlicz się',
      content: modalContent,
      maskClosable: true,
      onOk: handlePaymentPay,
    });
  };

  useEffect(() => {
    if (location.href.includes('/makePayment')) showPromiseModal();
  }, []);

  return userId === payment.paymentPayer.id ? (
    <div className={style.buttonWrapper}>
      <Button className={style.payButton} size="large" type="primary" onClick={showPromiseModal}>
        Zapłać
      </Button>
    </div>
  ) : null;
};
