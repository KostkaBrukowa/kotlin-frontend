import React from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  DollarCircleOutlined,
  HourglassOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { navigate } from '@reach/router';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import clsx from 'clsx';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { OwsType } from '../../app-context/AppContext';
import { getTooltipProps } from '../../enum-renderers/expenseTooltipRenderer';
import { expensesRoute, paymentsRoute } from '../../navigation/routerConstants';
import { handleSpaceAndEnter } from '../../utils/a11n/KeyHandlers';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { currency } from '../../utils/constants/currency';
import { stopPropagation } from '../../utils/functions/utilFunctions';

import style from './ExpenseList.module.less';

export interface ExpenseItemCardProps {
  id: string;
  name: string;
  amount: number | null;
  description: string;
  highlight?: boolean;
  expenseStatus: ExpenseStatus;
  paymentStatus?: PaymentStatus;
  owsType: OwsType;
}

export const ExpenseItemCard: React.FC<ExpenseItemCardProps> = ({
  description,
  name,
  amount,
  highlight,
  expenseStatus,
  paymentStatus,
  owsType,
  id,
}) => {
  const tooltipProps = getTooltipProps(owsType, expenseStatus, paymentStatus);
  const tooltipTitle = (
    <div className={clsx('data-cy-tooltip', style.tooltip)}>{tooltipProps?.title}</div>
  );
  const cardAmountStyle = clsx(style.expenseAmount, {
    [style.owsUserAmount]: owsType === OwsType.OWS_USER,
    [style.userOwsAmount]: owsType === OwsType.USER_OWS,
  });

  const handleClick = () =>
    navigate(`${owsType === OwsType.USER_OWS ? paymentsRoute : expensesRoute}/${id}`);

  return (
    <Card
      bordered
      className={clsx(style.card, { [style.cardHighlight]: highlight })}
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleSpaceAndEnter(handleClick)}
    >
      <Meta
        avatar={<IdenticonAvatar id={id} size={20} />}
        description={description}
        title={
          <div className={style.titleWrapper}>
            <Tooltip className="data-cy-title" title={tooltipTitle}>
              <div onClick={stopPropagation}>
                {name}
                {tooltipProps?.icon}
              </div>
            </Tooltip>
            <div className={cardAmountStyle}>
              {amount !== null ? `${amount} ${currency}` : null}
            </div>
          </div>
        }
      />
    </Card>
  );
};
