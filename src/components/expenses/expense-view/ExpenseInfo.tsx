import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Steps } from 'antd';

import { ExpenseStatus } from '../../../generated/graphql';
import { renderExpenseStatus } from '../../enum-renderers/expenseStatusRenderer';
import { getExpenseTooltipProps } from '../../enum-renderers/expenseTooltipRenderer';
import { Info, ViewDescription } from '../../utils/components/ViewDescription';
import { dateFrom, formatDate } from '../../utils/functions/date';
import { NotOptional } from '../../utils/types';
import { ExpenseQueryType } from './graphql/useSingleExpenseQuery';

import style from './ExpenseInfo.module.less';

export interface ExpenseInfoProps {
  expense: NotOptional<ExpenseQueryType>;
}

const { Step } = Steps;

const getCurrentStep = (status: ExpenseStatus) => {
  switch (status) {
    case ExpenseStatus.InProgressRequesting:
      return 0;
    case ExpenseStatus.InProgressPaying:
      return 1;
    case ExpenseStatus.Declined:
      return 3;
    case ExpenseStatus.Resolved:
      return 3;
  }
};

export const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ expense }) => {
  const isMd = useMediaQuery({ minWidth: 881 });

  return (
    <div className={style.wrapper}>
      <Steps
        current={getCurrentStep(expense.expenseStatus)}
        direction={isMd ? 'horizontal' : 'vertical'}
        size="small"
      >
        <Step
          description={getExpenseTooltipProps(ExpenseStatus.InProgressRequesting).title}
          title={renderExpenseStatus(ExpenseStatus.InProgressRequesting)}
        />
        <Step
          description={getExpenseTooltipProps(ExpenseStatus.InProgressPaying).title}
          title={renderExpenseStatus(ExpenseStatus.InProgressPaying)}
        />
        <Step
          description={getExpenseTooltipProps(ExpenseStatus.Resolved).title}
          title={renderExpenseStatus(ExpenseStatus.Resolved)}
        />
      </Steps>
      <ViewDescription className={style.viewDescription}>
        <Info description={expense.name} title="Nazwa" />
        <Info description={expense.expensePayer.name} title="Założyciel:" />
        <Info description={formatDate(dateFrom(expense.expenseDate))} title="Data założenia:" />
        <Info description={expense.description} title="Opis:" />
      </ViewDescription>
    </div>
  );
};
