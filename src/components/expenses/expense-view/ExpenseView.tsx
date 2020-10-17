import React, { useContext, useState } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { RouteComponentProps } from '@reach/router';
import { Button, Collapse } from 'antd';

import { renderCollapsableArrow } from '../../utils/components/CollapsableArrow';
import { useChangeExpenseStatusModal } from './UseChangeExpenseStatusModal';
import { ExpenseDetails } from './ExpenseDetails';
import { ExpenseMessages } from './ExpenseMessages';
import { ExpenseParticipants } from './ExpenseParticipants';
import { ExpensePayments } from './ExpensePayments';
import { useSingleExpense } from './graphql/useSingleExpenseQuery';

import style from './ExpenseView.module.less';
import { ConfirmPaymentsButton } from './ConfirmPaymentsButton';
import { UserContext } from '../../config/UserProvider';
import { EndExpenseButton } from './EndExpenseButton';

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
  const { userId } = useContext(UserContext);
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
          header="Płatności"
          key={CollapsableKeys.PAYMENTS}
          extra={<ConfirmPaymentsButton expense={expense} />}
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
      <div className={style.buttonGroup}>
        {userId === expense.expensePayer.id && (
          <Button danger className={style.deleteButton} icon={<DeleteOutlined />} type="primary">
            Usuń
          </Button>
        )}
      </div>
    </>
  );
};
