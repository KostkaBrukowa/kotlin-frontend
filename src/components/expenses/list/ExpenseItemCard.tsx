import React from 'react';
import { Avatar, Card, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import clsx from 'clsx';
import style from './ExpenseList.module.less';
import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { currency } from '../../utils/constants/currency';
import { OwsType } from '../ExpensesContext';
import { getTooltipProps } from '../../enum-renderers/expenseTooltipRenderer';
import { stopPropagation } from '../../utils/functions/utilFunctions';

export interface ExpenseItemCardProps {
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
}) => {
  const cardAmountStyle = clsx(style.expenseAmount, {
    [style.owsUserAmount]: owsType === OwsType.OWS_USER,
    [style.userOwsAmount]: owsType === OwsType.USER_OWS,
  });
  const tooltipProps = getTooltipProps(owsType, status);

  return (
    <Card hoverable className={style.card} onClick={() => console.log('tsratars')}>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        description={description}
        title={
          <div className={style.titleWrapper}>
            <Tooltip title={<div className={style.tooltip}>{tooltipProps.title}</div>}>
              <div onClick={stopPropagation}>
                {name}
                {tooltipProps.icon}
              </div>
            </Tooltip>
            <div className={cardAmountStyle}>{amount ? `${amount} ${currency}` : null}</div>
          </div>
        }
      />
    </Card>
  );
};
