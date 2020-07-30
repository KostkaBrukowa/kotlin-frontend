import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/all';
import { navigate } from '@reach/router';
import { Row, Statistic } from 'antd';
import style from './ExpenseView.module.less';
import { expensesRoute } from '../../navigation/routerConstants';
import { IdenticonAvatar } from '../../utils/avatars/IdenticonAvatar';
import { currency } from '../../utils/constants/currency';
import { ExpenseInfo } from './ExpenseInfo';
import { getExpenseTooltipProps } from '../../enum-renderers/expenseStatusRenderer';
import { ExpenseQueryType } from './useSingleExpenseQuery';

export interface ExpenseDetailsProps {
  expense: Exclude<ExpenseQueryType, null | undefined>;
}

const AVATAR_SIZE = 40;

export const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense }) => (
  <div className={style.wrapper}>
    <div className={style.headerWrapper}>
      <AiOutlineArrowLeft size="18px" onClick={() => navigate(expensesRoute)} />
      <div className={style.mainInfoWrapper}>
        <IdenticonAvatar id={expense.id || null} size={AVATAR_SIZE} />
      </div>
    </div>
    <Row justify="space-between">
      <Statistic title="Status" value={getExpenseTooltipProps(expense.expenseStatus)} />
      <Statistic suffix={currency} title="Koszt wydatku" value={expense.amount} />
    </Row>
    <ExpenseInfo expense={expense} />
  </div>
);
