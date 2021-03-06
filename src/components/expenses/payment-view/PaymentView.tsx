import React from 'react';
import { GiArrowDunk } from 'react-icons/all';
import { navigate, RouteComponentProps } from '@reach/router';
import { PageHeader } from 'antd';

import { expensesRoute } from '../../navigation/routerConstants';
import { singleViewStyle } from '../../utils/components/ViewStyles';
import { useSinglePayment } from './graphql/useSinglePayment';
import { PaymentDescription } from './PaymentDescription';
import { PaymentStatusManagementButton } from './PaymentStatusManagementButton';
import { usePaymentArrowStyle } from './usePaymentArrowStyle';

import style from './PaymentView.module.less';

interface RouteParams {
  paymentId?: string;
}

export type PaymentViewProps = RouteComponentProps<RouteParams>;

export const PaymentView: React.FC<PaymentViewProps> = ({ paymentId }) => {
  const { dataComponent, extractedData: payment } = useSinglePayment(paymentId);
  const { payerNameRectRef, receiverNameRectRef, style: arrowStyle } = usePaymentArrowStyle();

  if ((dataComponent !== null && !payment) || !payment) return dataComponent;

  const handleBack = () =>
    navigate(`${expensesRoute}/${payment?.paymentExpense.id}`, { replace: true });

  return (
    <div style={singleViewStyle}>
      <PageHeader
        className={style.pageHeader}
        subTitle={`Z: ${payment.paymentExpense.name}`}
        title="Płatność"
        onBack={handleBack}
      />
      <PaymentStatusManagementButton payment={payment} />
      <div className={style.wrapper}>
        <GiArrowDunk className={style.icon} style={arrowStyle} />
        <PaymentDescription
          payerRefCallback={payerNameRectRef}
          payment={payment}
          receiverRefCallback={receiverNameRectRef}
        />
      </div>
    </div>
  );
};
