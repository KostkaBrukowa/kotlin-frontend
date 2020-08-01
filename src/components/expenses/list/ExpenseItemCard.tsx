import React from 'react';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import clsx from 'clsx';
import { navigate } from '@reach/router';
import style from './ExpenseList.module.less';
import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { currency } from '../../utils/constants/currency';
import { OwsType } from '../../app-context/AppContext';
import { getTooltipProps } from '../../enum-renderers/expenseTooltipRenderer';
import { stopPropagation } from '../../utils/functions/utilFunctions';
import { expensesRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';

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
      onClick={() => navigate(`${expensesRoute}/${id}`)}
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
