import React from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import { Statistic } from 'antd';
import clsx from 'clsx';

import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { currency } from '../../utils/constants/currency';
import { dateFrom, formatDate } from '../../utils/functions/date';
import { capitalize } from '../../utils/functions/string';
import { RefCallback } from '../../utils/hooks/useClientRect';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from './graphql/useSinglePayment';

import style from './PaymentView.module.less';

const dateInfoClassName = clsx(style.infoSection, style.dateSection);

export interface PaymentDescriptionProps {
  payment: NotOptional<PaymentQueryType>;
  payerRefCallback: RefCallback;
  receiverRefCallback: RefCallback;
}

export const PaymentDescription: React.FC<PaymentDescriptionProps> = ({
  payment,
  payerRefCallback,
  receiverRefCallback,
}) => (
  <div>
    <div className={style.infoSection} ref={payerRefCallback}>
      <Statistic title="Płaci:" value={capitalize(payment.paymentPayer.name)} />
    </div>
    <div className={style.infoSection} ref={receiverRefCallback}>
      <Statistic title="Odbiorca:" value={capitalize(payment.paymentExpense.expensePayer.name)} />
    </div>
    <div className={style.infoSection}>
      <Statistic title="Opis wydatku:" value={capitalize(payment.paymentExpense.description)} />
    </div>
    <div className={style.infoSection}>
      {payment.amount ? (
        <Statistic suffix={currency} title="Kwota:" value={payment.amount || '0'} />
      ) : (
        <Statistic title="Kwota:" value="Nie wszyscy potwierdzili udział" />
      )}
    </div>
    <div className={style.infoSection}>
      <Statistic title="Status:" value={renderPaymentStatus(payment.status)} />
    </div>
    <div className={dateInfoClassName}>
      <div className={style.dateWrapper}>
        <CalendarOutlined className={style.calendarIcon} />
        Wystawiona:
        <br />
        {formatDate(dateFrom(payment.createdAt))}
      </div>
      <div className={style.dateWrapper}>
        <CalendarOutlined className={style.calendarIcon} />
        Opłacona: <br />
        {payment.paidAt ? formatDate(dateFrom(payment.createdAt)) : 'Nie zapłacone'}
      </div>
    </div>
  </div>
);
