import React, { useContext, useEffect } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Button, Row, Statistic } from 'antd';

import { ExpenseStatus } from '../../generated/graphql';
import { ElementHeader } from '../common/element-header/ElementHeader';
import { UserContext } from '../config/UserProvider';
import {
  finishedExpenseStatuses,
  finishedPaymentStatuses,
} from '../expenses/common/FinishedStatuses';
import { friendsRoute, settingsRoute } from '../navigation/routerConstants';
import { singleViewStyle } from '../utils/components/ViewStyles';
import { currency } from '../utils/constants/currency';
import { useUserViewData } from './graphql/useUserViewData';
import { UserInfoItem } from './UserInfoItem';

import style from './UserView.module.less';

interface RouteProps {
  userId: string;
}

export type UserViewProps = RouteComponentProps<RouteProps>;

export const UserView: React.FC<UserViewProps> = ({ userId }) => {
  const { userId: currentUserId } = useContext(UserContext);
  const { dataComponent, data } = useUserViewData(userId);

  useEffect(() => {
    if (userId === currentUserId) {
      navigate(settingsRoute, { replace: false });
    }
  }, [currentUserId, userId]);

  if (dataComponent || !data) return dataComponent ?? null;

  const {
    findUsersFriends: friends,
    getClientsPayments: payments,
    getExpensesForUser: expenses,
    getUser: user,
  } = data;

  const handleAddFriend = () => navigate(`${friendsRoute}?email=${user?.email}`);

  const userOwsCurrentUser = expenses
    .filter((it) => it.expenseStatus === ExpenseStatus.InProgressPaying)
    .flatMap((it) => it.expensePayments.filter((payment) => payment.paymentPayer.id === userId))
    .reduce((acc, it) => acc + (it.amount ?? 0), 0);
  const currentUserOws = payments
    .filter(
      (it) =>
        !finishedPaymentStatuses.includes(it.status) &&
        !finishedExpenseStatuses.includes(it.paymentExpense.expenseStatus),
    )
    .filter((it) => it.paymentExpense.expensePayer.id === userId)
    .reduce((acc, it) => acc + (it.amount ?? 0), 0);
  const isFriend = friends.some((it) => it.id === userId);

  return (
    <div className={style.wrapper} style={singleViewStyle}>
      <ElementHeader id={userId} />
      <Row className={style.statistics} justify="space-between">
        <Statistic
          precision={2}
          suffix={currency}
          title="Użytkownik ci wisi"
          value={userOwsCurrentUser}
          valueStyle={{ color: '#50b121' }}
        />
        <Statistic
          precision={2}
          suffix={currency}
          title="Wisisz użytkownikowi"
          value={currentUserOws}
          valueStyle={{ color: '#cf1322' }}
        />
      </Row>
      <div className={style.infoItems}>
        <UserInfoItem title="Imię" value={user?.name} />
        <UserInfoItem title="Email" value={user?.email} />
        <UserInfoItem title="Numer konta" value={user?.bankAccount} />
      </div>
      {!isFriend && (
        <div className={style.addFriendButton}>
          <Button type="primary" onClick={handleAddFriend}>
            Dodaj do znajomych
          </Button>
        </div>
      )}
    </div>
  );
};
