import React, { useContext, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { Button, Modal } from 'antd';
import clsx from 'clsx';

import { UserContext } from '../../config/UserProvider';
import { currency } from '../../utils/constants/currency';
import { capitalize } from '../../utils/functions/string';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from './useSinglePaymentQuery';

import style from './PaymentView.module.less';

export interface PaymentPayButtonProps {
  payment: NotOptional<PaymentQueryType>;

  onPaySuccess(): any;
}

const buttonClassName = clsx(style.payButton, 'data-cy-main-pay-button');

export const PaymentPayButton: React.FC<PaymentPayButtonProps> = ({ payment, onPaySuccess }) => {
  const { userId } = useContext(UserContext);
  const location = useLocation();

  const receiverName = capitalize(payment.paymentExpense.expensePayer.name);
  const modalContent = `Właśnie potwierdzasz, że oddałeś ${receiverName} kwotę w wysokości ${payment.amount} ${currency}.`;

  const handlePaymentPay = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        onPaySuccess();
        resolve();
      }, 1000);
    }).catch(() => console.log('Oops errors!'));

  const showPromiseModal = () =>
    Modal.confirm({
      title: 'Rozlicz się',
      content: modalContent,
      maskClosable: true,
      onOk: handlePaymentPay,
    });

  useEffect(() => {
    if (location.href.includes('/makePayment')) showPromiseModal();
  }, []);

  return userId === payment.paymentPayer.id ? (
    <div className={style.buttonWrapper}>
      <Button className={buttonClassName} size="large" type="primary" onClick={showPromiseModal}>
        Zapłać
      </Button>
    </div>
  ) : null;
};
