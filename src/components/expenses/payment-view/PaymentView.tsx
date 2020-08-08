import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { GiArrowDunk } from 'react-icons/all';
import { PageHeader } from 'antd';
import { useSinglePayment } from './useSinglePaymentQuery';
import style from './PaymentView.module.less';
import { expensesRoute } from '../../navigation/routerConstants';
import { usePaymentArrowStyle } from './usePaymentArrowStyle';
import { PaymentDescription } from './PaymentDescription';
import { PaymentPayButton } from './PaymentPayButton';

interface RouteParams {
  paymentId?: string;
}

export type PaymentViewProps = RouteComponentProps<RouteParams>;

export const PaymentView: React.FC<PaymentViewProps> = ({ paymentId }) => {
  const { dataComponent, extractedData: payment } = useSinglePayment(paymentId);
  const { payerNameRectRef, receiverNameRectRef, style: arrowStyle } = usePaymentArrowStyle();

  if (dataComponent !== null || !payment) return dataComponent ?? null;

  const handleBack = () => navigate(`${expensesRoute}/${payment?.paymentExpense.id}`);

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
      <PaymentPayButton payment={payment} />
    </>
  );
};
