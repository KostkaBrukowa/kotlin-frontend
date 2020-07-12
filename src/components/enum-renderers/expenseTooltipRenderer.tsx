import React from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { OwsType } from '../app-context/AppContext';
import { ExpenseStatus, PaymentStatus } from '../../generated/graphql';
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
        title: 'Platność czeka na potwierdzenie od innego użytkownika',
      };
    case PaymentStatus.Accepted:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Platność zostala zaakceptowana i czeka za zaplatę.',
      };
    case PaymentStatus.Bulked:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Platność zostala polączona w jedna wiekszą platność.',
      };
    case PaymentStatus.Confirmed:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Platność zakonczona.',
      };
    case PaymentStatus.Declined:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Platność odrzucona.',
      };
    case PaymentStatus.Paid:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Użytkownik oplacil jego część.',
      };
    default:
      throw new Error(`Uknown payment status ${status}`);
  }
}

function getExpenseTooltipProps(status: ExpenseStatus): TooltipProps {
  switch (status) {
    case ExpenseStatus.InProgressRequesting:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Nie wszyscy zaakceptowali swoje platności.',
      };
    case ExpenseStatus.InProgressPaying:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Czekamy na platności.',
      };
    case ExpenseStatus.Declined:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Wydatek zostal odrzucony.',
      };
    case ExpenseStatus.Resolved:
      return {
        icon: <CheckCircleOutlined className={style.infoCircle} />,
        title: 'Wszyscy zaplacili swoją część.',
      };
    default:
      throw new Error(`Uknown expense status status ${status}`);
  }
}

export const getTooltipProps = (
  owsType: OwsType,
  status: ExpenseStatus | PaymentStatus,
): TooltipProps => {
  if (owsType === OwsType.USER_OWS) return getPaymentTooltipProps(status as PaymentStatus);

  return getExpenseTooltipProps(status as ExpenseStatus);
};
