import React from 'react';
import { GiWallet } from 'react-icons/all';
import { navigate } from '@reach/router';

import { NotificationEvent } from '../../../generated/graphql';
import { NotificationExpenseModel } from '../../mappers/notifications/NotificationMapperTypes';
import { expensesRoute } from '../../navigation/routerConstants';
import { ListItem } from './ListItem';

export interface ExpenseNotificationProps {
  notificationModel: NotificationExpenseModel;
  userId: string | null;
}

export const ExpenseNotification: React.FC<ExpenseNotificationProps> = ({
  notificationModel: { id, actor, receiver, expenseId, createdAt, event, isRead },
  userId,
}) => {
  const handleClick = () => navigate(`${expensesRoute}/${expenseId}`);

  const renderText = () => {
    const isActorCurrentUser = actor?.id === userId;

    switch (event) {
      case NotificationEvent.Creation:
        return isActorCurrentUser
          ? 'Ty utworzyłeś wydatek'
          : `${actor?.name} zaprosił cię do wzięcia udziału w wydatku.`;
      case NotificationEvent.Paid:
        return isActorCurrentUser
          ? `Ty zapłaciłeś za wydatek ${receiver?.name}.`
          : `${actor?.name} zapłacił za twój wydatek.`;
      case NotificationEvent.Deletion:
        return isActorCurrentUser
          ? 'Ty usunąłeś wydatek.'
          : `${actor?.name} usunął wydatek w którym brałeś udział.`;
      default:
        return 'Coś innego się jeszcze stało.';
    }
  };

  return (
    <ListItem
      avatarIcon={<GiWallet />}
      date={createdAt}
      isRead={isRead}
      notificationId={id}
      title={renderText()}
      onClick={handleClick}
    />
  );
};
