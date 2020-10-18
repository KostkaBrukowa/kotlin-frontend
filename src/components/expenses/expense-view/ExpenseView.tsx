import React, { useContext, useState } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { RouteComponentProps } from '@reach/router';
import { Button, Collapse } from 'antd';

import { UserContext } from '../../config/UserProvider';
import { renderCollapsableArrow } from '../../utils/components/CollapsableArrow';
import { ConfirmPaymentsButton } from './ConfirmPaymentsButton';
import { EndExpenseButton } from './EndExpenseButton';
import { ExpenseDetails } from './ExpenseDetails';
import { ExpenseMessages } from './ExpenseMessages';
import { ExpenseParticipants } from './ExpenseParticipants';
import { ExpensePayments } from './ExpensePayments';
import { useSingleExpense } from './graphql/useSingleExpenseQuery';
import { RemoveExpenseButton } from './RemoveExpenseButton';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';

import style from './ExpenseView.module.less';

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

  if (dataComponent !== null || !expense) return dataComponent;

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
        <Collapse.Panel header="Wiadomości" key={CollapsableKeys.MESSAGES}>
          <ExpenseMessages />
        </Collapse.Panel>
      </Collapse>
      <RemoveExpenseButton expense={expense} />
    </>
  );
};
