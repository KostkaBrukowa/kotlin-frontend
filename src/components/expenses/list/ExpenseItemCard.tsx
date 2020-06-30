import React from 'react';
import { Avatar, Card, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import style from './ExpenseList.module.less';
import { ExpenseStatus, PaymentStatus } from '../../../generated/graphql';
import { currency } from '../../utils/constants/currency';
import { OwsType } from '../ExpensesContext';

export interface ExpenseItemCardProps {
  name: string;
  amount: number;
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
}) => (
  <Card hoverable className={style.card} onClick={() => {}}>
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      description={description}
      title={
        <div className={style.titleWrapper}>
          <Tooltip title="Wszyscy zaplacili za twój wydatek">
            <div>
              {name}
              <CheckCircleOutlined className={style.infoCircle} />
            </div>
          </Tooltip>
          <div className={style.owsUserSum}>
            {amount} {currency}
          </div>
        </div>
      }
    />
  </Card>
);
