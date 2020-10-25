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

function getPaymentTooltipProps(expenseStatus: ExpenseStatus, status: PaymentStatus): TooltipProps {
  switch (status) {
    case PaymentStatus.InProgress:
      return {
        icon: <SendOutlined className={style.infoCircle} />,
        title: 'Płatność czeka na twoje potwierdzenie.',
      };
    case PaymentStatus.Accepted:
      return {
        icon: <HourglassOutlined className={style.infoCircle} />,
        title:
          expenseStatus === ExpenseStatus.InProgressPaying
            ? 'Płatność została zaakceptowana i czeka na twoją zapłatę.'
            : 'Płatność została zaakceptowana i czeka na' +
              ' potwierdzenie od założyciela wydatku lub innych uczestników.',
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
        icon:
          expenseStatus === ExpenseStatus.InProgressPaying ? (
            <DollarCircleOutlined className={style.infoCircle} />
          ) : (
            <CheckCircleTwoTone className={style.infoCircle} twoToneColor="#52c41a" />
          ),
        title:
          expenseStatus === ExpenseStatus.InProgressPaying
            ? 'Opłaciłeś swoją część. Płatność oczekuje na potwierdzenie założyciela.'
            : 'Płatność zakończona',
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
  expenseStatus: ExpenseStatus,
  paymentStatus?: PaymentStatus,
): TooltipProps | null => {
  if (owsType === OwsType.USER_OWS) {
    return paymentStatus ? getPaymentTooltipProps(expenseStatus, paymentStatus) : null;
  }

  return getExpenseTooltipProps(expenseStatus);
};
