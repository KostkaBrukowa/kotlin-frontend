import React from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

import { ExpenseStatus, PaymentStatus } from '../../generated/graphql';
import { OwsType } from '../app-context/AppContext';

import style from '../expenses/list/ExpenseList.module.less';

interface TooltipProps {
  title: string;
  icon: React.ReactNode;
}

function getPaymentTooltipProps(status: PaymentStatus): TooltipProps {
  switch (status) {
    case PaymentStatus.InProgress:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność czeka na potwierdzenie od innego użytkownika',
      };
    case PaymentStatus.Accepted:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność została zaakceptowana i czeka za zapłatę.',
      };
    case PaymentStatus.Bulked:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność została połączona w jedna większą płatność.',
      };
    case PaymentStatus.Confirmed:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność zakończona.',
      };
    case PaymentStatus.Declined:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność odrzucona.',
      };
    case PaymentStatus.Paid:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Użytkownik opłacił jego część.',
      };
    default:
      throw new Error(`Unknown payment status ${status}`);
  }
}

export function getExpenseTooltipProps(status: ExpenseStatus): TooltipProps {
  switch (status) {
    case ExpenseStatus.InProgressRequesting:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Nie wszyscy zaakceptowali swoje płatności.',
      };
    case ExpenseStatus.InProgressPaying:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Czekamy na płatności.',
      };
    case ExpenseStatus.Declined:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Wydatek został odrzucony.',
      };
    case ExpenseStatus.Resolved:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Wszyscy zapłacili swoją część.',
      };
    default:
      throw new Error(`Unknown expense status status ${status}`);
  }
}

export const getTooltipProps = (
  owsType: OwsType,
  status: ExpenseStatus | PaymentStatus,
): TooltipProps => {
  if (owsType === OwsType.USER_OWS) return getPaymentTooltipProps(status as PaymentStatus);

  return getExpenseTooltipProps(status as ExpenseStatus);
};
