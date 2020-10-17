import React, { useContext, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { Button, message, Modal } from 'antd';
import clsx from 'clsx';

import { PaymentStatus } from '../../../generated/graphql';
import { UserContext } from '../../config/UserProvider';
import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { currency } from '../../utils/constants/currency';
import { capitalize } from '../../utils/functions/string';
import { NotOptional } from '../../utils/types';
import { isPaymentActionable } from '../common/PaymentButtonCommon';
import { useChangePaymentStatus } from './graphql/useChangePaymentStatus';
import { PaymentQueryType } from './graphql/useSinglePayment';

import style from './PaymentView.module.less';

export interface PaymentPayButtonProps {
  payment: NotOptional<PaymentQueryType>;
}

const buttonClassName = clsx(style.payButton, 'data-cy-main-pay-button');

export const PaymentStatusManagementButton: React.FC<PaymentPayButtonProps> = ({ payment }) => {
  const location = useLocation();
  const { userId } = useContext(UserContext);
  const { changePaymentStatus } = useChangePaymentStatus(payment.id);

  const newPaymentStatus =
    payment.status === PaymentStatus.InProgress ? PaymentStatus.Accepted : PaymentStatus.Paid;
  const shouldRenderButton =
    userId === payment.paymentPayer.id &&
    isPaymentActionable(payment.status, payment.paymentExpense.expenseStatus);

  useEffect(() => {
    if (location.href.includes('/makePayment') && shouldRenderButton) showPromiseModal();
  }, []);

  const showPromiseModal = () =>
    Modal.confirm({
      title: getButtonTitle(payment.status),
      content: getModalContent(payment),
      maskClosable: true,
      onOk: async () => {
        await changePaymentStatus(newPaymentStatus);

        message.success(renderPaymentStatus(newPaymentStatus));
      },
    });

  return shouldRenderButton ? (
    <div className={style.buttonWrapper}>
      <Button className={buttonClassName} size="large" type="primary" onClick={showPromiseModal}>
        {getButtonTitle(payment.status)}
      </Button>
    </div>
  ) : null;
};

const getButtonTitle = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.Accepted:
      return 'Rozlicz się';
    case PaymentStatus.InProgress:
      return 'Potwierdź udział';
    case PaymentStatus.Bulked: // todo bulked
    default:
      return null;
  }
};

const getModalContent = (payment: NotOptional<PaymentQueryType>) => {
  const receiverName = capitalize(payment.paymentExpense.expensePayer.name);

  switch (payment.status) {
    case PaymentStatus.Accepted:
      return `Właśnie potwierdzasz, że oddałeś ${receiverName} kwotę w wysokości ${payment.amount} ${currency}.`;
    case PaymentStatus.InProgress:
      return 'Właśnie potwierdzasz, że brałeś udział w wydatku i jesteś gotowy oddać za niego część kwoty.';
    case PaymentStatus.Bulked: // todo bulked
    default:
      return null;
  }
};
