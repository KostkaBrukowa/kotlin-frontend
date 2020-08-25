import React from 'react';
import { AiOutlineCalendar } from 'react-icons/all';
import { Statistic } from 'antd';
import clsx from 'clsx';

import { renderPaymentStatus } from '../../enum-renderers/paymentStatusRenderer';
import { currency } from '../../utils/constants/currency';
import { capitalize } from '../../utils/functions/string';
import { RefCallback } from '../../utils/hooks/useClientRect';
import { NotOptional } from '../../utils/types';
import { PaymentQueryType } from './useSinglePaymentQuery';

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
  <div className={style.infoWrapper}>
    <div className={style.infoSection} ref={payerRefCallback}>
      <Statistic title="Płaci:" value={capitalize(payment.paymentPayer.name)} />
    </div>
    <div className={style.infoSection} ref={receiverRefCallback}>
      <Statistic title="Obiorca:" value={capitalize(payment.paymentExpense.expensePayer.name)} />
    </div>
    <div className={style.infoSection}>
      <Statistic suffix={currency} title="Kwota:" value={payment.amount || '0'} />
    </div>
    <div className={style.infoSection}>
      <Statistic title="Status:" value={renderPaymentStatus(payment.status)} />
    </div>
    <div className={dateInfoClassName}>
      <div className={style.dateWrapper}>
        <AiOutlineCalendar className={style.calendarIcon} />
        Data wystawienia:
        <br /> 20.01.2020
      </div>
      <div className={style.dateWrapper}>
        <AiOutlineCalendar className={style.calendarIcon} />
        Data zapłaty: <br /> {/* todo add the dates to a payment */}
        Nie zapłacone
      </div>
    </div>
  </div>
);
