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
  notificationModel: { actor, receiver, expenseId, createdAt, event },
  userId,
}) => {
  const handleClick = () => navigate(`${expensesRoute}/${expenseId}`);
  const handleDelete = () => console.log('Removed expense');

  const renderText = () => {
    const isActorCurrentUser = actor?.id === userId;

    switch (event) {
      case NotificationEvent.Creation:
        return isActorCurrentUser
          ? 'Ty utworzyleś wydatek'
          : `${receiver?.name} zaprosił cię do wzięcia udziału w wydatku.`;
      case NotificationEvent.Paid:
        return isActorCurrentUser
          ? `Ty zapłaciłeś za wydatek ${receiver?.name}.`
          : `${receiver?.name} zapłacił za twój wydatek.`;
      case NotificationEvent.Deletion:
        return isActorCurrentUser
          ? 'Ty usunąłeś wydatek.'
          : `${receiver?.name} usunął wydatek w którym brałeś udział.`;
      default:
        return 'Coś innego się jeszcze stało.';
    }
  };

  return (
    <ListItem
      avatarIcon={<GiWallet />}
      date={createdAt}
      title={renderText()}
      onClick={handleClick}
      onRemove={handleDelete}
    />
  );
};
