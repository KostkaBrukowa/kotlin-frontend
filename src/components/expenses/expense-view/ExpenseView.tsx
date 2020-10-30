import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Collapse } from 'antd';
import { renderCollapsableArrow } from '../../utils/components/CollapsableArrow';
import { ConfirmPaymentsButton } from './ConfirmPaymentsButton';
import { EndExpenseButton } from './EndExpenseButton';
import { ExpenseDetails } from './ExpenseDetails';
import { ExpenseParticipants } from './ExpenseParticipants';
import { ExpensePayments } from './ExpensePayments';
import { useSingleExpense } from './graphql/useSingleExpenseQuery';
import { RemoveExpenseButton } from './RemoveExpenseButton';

enum CollapsableKeys {
  PAYMENTS,
  PARTICIPANTS,
  MESSAGES,
}

interface RouteParams {
  expenseId?: string;
}

export type ExpenseViewProps = RouteComponentProps<RouteParams>;

export const ExpenseView: React.FC<ExpenseViewProps> = ({ expenseId }) => {
  const { dataComponent, extractedData: expense } = useSingleExpense(expenseId);

  if ((dataComponent !== null && !expense) || !expense) return dataComponent;

  return (
    <>
      <EndExpenseButton expense={expense} />
      <ExpenseDetails expense={expense} />
      <Collapse
        bordered={false}
        defaultActiveKey={[CollapsableKeys.PAYMENTS]}
        expandIcon={renderCollapsableArrow}
      >
        <Collapse.Panel
          extra={<ConfirmPaymentsButton expense={expense} />}
          header="Płatności"
          key={CollapsableKeys.PAYMENTS}
        >
          <ExpensePayments expense={expense} payments={expense.expensePayments} />
        </Collapse.Panel>
        <Collapse.Panel header="Uczestnicy" key={CollapsableKeys.PARTICIPANTS}>
          <ExpenseParticipants payments={expense.expensePayments} />
        </Collapse.Panel>
        {/* <Collapse.Panel header="Wiadomości" key={CollapsableKeys.MESSAGES}> */}
        {/*  <ExpenseMessages /> */}
        {/* </Collapse.Panel> */}
      </Collapse>
      <RemoveExpenseButton expense={expense} />
    </>
  );
};
