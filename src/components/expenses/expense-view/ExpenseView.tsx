import React from 'react';
import { Collapse } from 'antd';
import { RouteComponentProps } from '@reach/router';
import { ExpenseDetails } from './ExpenseDetails';
import { ExpensePayments } from './ExpensePayments';
import { ExpenseParticipants } from './ExpenseParticipants';
import { ExpenseMessages } from './ExpenseMessages';
import { renderCollapsableArrow } from '../../utils/list-utils/CollapsableArrow';
import { useSingleExpense } from './useSingleExpenseQuery';

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

  if (dataComponent !== null || !expense) return dataComponent ?? null;

  return (
    <>
      <ExpenseDetails expense={expense} />
      <Collapse
        bordered={false}
        defaultActiveKey={[CollapsableKeys.PAYMENTS]}
        expandIcon={renderCollapsableArrow}
      >
        <Collapse.Panel header="Płatności" key={CollapsableKeys.PAYMENTS}>
          <ExpensePayments payments={expense.expensePayments} />
        </Collapse.Panel>
        <Collapse.Panel header="Uczestnicy" key={CollapsableKeys.PARTICIPANTS}>
          <ExpenseParticipants payments={expense.expensePayments} />
        </Collapse.Panel>
        <Collapse.Panel header="Wiadomości" key={CollapsableKeys.MESSAGES}>
          <ExpenseMessages />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
