import React from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  DollarCircleOutlined,
  HourglassOutlined,
  SendOutlined,
} from '@ant-design/icons';
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
        icon: <SendOutlined className={style.infoCircle} />,
        title: 'Płatność czeka na twoje potwierdzenie.',
      };
    case PaymentStatus.Accepted:
      return {
        icon: <HourglassOutlined className={style.infoCircle} />,
        title: 'Płatność została zaakceptowana i czeka na twoją zapłatę.',
      };
    case PaymentStatus.Bulked:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Płatność została połączona w jedna większą płatność.',
      };
    case PaymentStatus.Confirmed:
      return {
        icon: <CheckCircleTwoTone className={style.infoCircle} twoToneColor="#52c41a" />,
        title: 'Płatność zakończona.',
      };
    case PaymentStatus.Declined:
      return {
        icon: <CloseCircleOutlined className={style.infoCircle} />,
        title: 'Płatność odrzucona.',
      };
    case PaymentStatus.Paid:
      return {
        icon: <DollarCircleOutlined className={style.infoCircle} />,
        title: 'Opłaciłeś swoją część. Płatność oczekuje na potwierdzenie założyciela.',
      };
    default:
      throw new Error(`Unknown payment status ${status}`);
  }
}

export function getExpenseTooltipProps(status: ExpenseStatus): TooltipProps {
  switch (status) {
    case ExpenseStatus.InProgressRequesting:
      return {
        icon: <SendOutlined className={style.infoCircle} />,
        title:
          'Informacja o płatnościach została wysłana, ale nie wszyscy zaakceptowali swoje' +
          ' płatności.',
      };
    case ExpenseStatus.InProgressPaying:
      return {
        icon: <HourglassOutlined className={style.infoCircle} />,
        title: 'Czekamy na płatności.',
      };
    case ExpenseStatus.Declined:
      return {
        icon: <CloseCircleOutlined className={style.infoCircle} />,
        title: 'Wydatek został odrzucony.',
      };
    case ExpenseStatus.Resolved:
      return {
        icon: <CheckCircleTwoTone className={style.infoCircle} twoToneColor="#52c41a" />,
        title: 'Wszyscy zapłacili swoją część. Wydatek zakończony.',
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
