import React from 'react';
import { GiArrowDunk } from 'react-icons/all';
import { navigate, RouteComponentProps } from '@reach/router';
import { PageHeader } from 'antd';

import { expensesRoute } from '../../navigation/routerConstants';
import { PaymentDescription } from './PaymentDescription';
import { PaymentPayButton } from './PaymentPayButton';
import { usePaymentArrowStyle } from './usePaymentArrowStyle';
import { useSinglePayment } from './useSinglePaymentQuery';

import style from './PaymentView.module.less';

interface RouteParams {
  paymentId?: string;
}

export type PaymentViewProps = RouteComponentProps<RouteParams>;

export const PaymentView: React.FC<PaymentViewProps> = ({ paymentId }) => {
  const { dataComponent, extractedData: payment, refetch } = useSinglePayment(paymentId);
  const { payerNameRectRef, receiverNameRectRef, style: arrowStyle } = usePaymentArrowStyle();

  if (dataComponent !== null || !payment) return dataComponent;

  const handleBack = () =>
    navigate(`${expensesRoute}/${payment?.paymentExpense.id}`, { replace: true });

  return (
    <>
      <PageHeader
        className={style.pageHeader}
        subTitle={`Z: ${payment.paymentExpense.name}`}
        title="Płatność"
        onBack={handleBack}
      />
      <div className={style.wrapper}>
        <GiArrowDunk className={style.icon} style={arrowStyle} />
        <PaymentDescription
          payerRefCallback={payerNameRectRef}
          payment={payment}
          receiverRefCallback={receiverNameRectRef}
        />
      </div>
      <PaymentPayButton payment={payment} onPaySuccess={refetch} />
    </>
  );
};
