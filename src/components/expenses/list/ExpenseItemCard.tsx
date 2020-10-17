import React from 'react';
import { gql } from '@apollo/client';
import { navigate } from '@reach/router';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import clsx from 'clsx';

import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { OwsType } from '../../app-context/AppContext';
import { client } from '../../config/graphql';
import { getTooltipProps } from '../../enum-renderers/expenseTooltipRenderer';
import { expensesRoute, paymentsRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { currency } from '../../utils/constants/currency';
import { stopPropagation } from '../../utils/functions/utilFunctions';

import style from './ExpenseList.module.less';

export interface ExpenseItemCardProps {
  id: string;
  name: string;
  amount: number | null;
  description: string;
  status: ExpenseStatus | PaymentStatus;
  owsType: OwsType;
}

export const ExpenseItemCard: React.FC<ExpenseItemCardProps> = ({
  description,
  name,
  amount,
  status,
  owsType,
  id,
}) => {
  const tooltipProps = getTooltipProps(owsType, status);
  const TooltipTitle = () => (
    <div className={clsx('data-cy-tooltip', style.tooltip)}>{tooltipProps.title}</div>
  );
  const cardAmountStyle = clsx(style.expenseAmount, {
    [style.owsUserAmount]: owsType === OwsType.OWS_USER,
    [style.userOwsAmount]: owsType === OwsType.USER_OWS,
  });

  return (
    <Card
      bordered
      hoverable
      className={style.card}
      onClick={() =>
        navigate(`${owsType === OwsType.USER_OWS ? paymentsRoute : expensesRoute}/${id}`)
      }
    >
      <Meta
        avatar={<IdenticonAvatar id={id} size={20} />}
        description={description}
        title={
          <div className={style.titleWrapper}>
            <Tooltip className="data-cy-title" title={<TooltipTitle />}>
              <div onClick={stopPropagation}>
                {name}
                {tooltipProps.icon}
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
