import React from 'react';
import { MdReceipt } from 'react-icons/all';
import { navigate } from '@reach/router';
import { NotificationPaymentModel } from '../../mappers/notifications/NotificationMapperTypes';
import { ListItem } from './ListItem';
import { expensesRoute } from '../../navigation/routerConstants';
import { NotificationEvent } from '../../../generated/graphql';

export interface PaymentNotificationProps {
  notificationModel: NotificationPaymentModel;
  userId: string | null;
}

export const PaymentNotification: React.FC<PaymentNotificationProps> = ({
  notificationModel: { actor, receiver, paymentId, createdAt, event },
  userId,
}) => {
  const handleClick = () => navigate(`${expensesRoute}/payments/${paymentId}`);
  const handleDelete = () => console.log('Removed payment');

  const renderTitle = () => {
    const isActorCurrentUser = actor?.id === userId;

    switch (event) {
      case NotificationEvent.Creation:
        return isActorCurrentUser
          ? 'Ty stworzyłeś płatność.'
          : `${receiver?.name} stworzył płatność.`;
      case NotificationEvent.Accepted:
        return isActorCurrentUser
          ? 'Ty zaakceptowałeś płatność.'
          : `${receiver?.name} zaakceptował płatność.`;
      case NotificationEvent.Declined:
        return isActorCurrentUser
          ? 'Ty odrzuciłeś płatność.'
          : `${receiver?.name} odrzucił płatność.`;
      case NotificationEvent.Deletion:
        return isActorCurrentUser ? 'Usunąłeś płatność.' : `${receiver?.name} usunął płatność.`;
      case NotificationEvent.Confirmed:
        return isActorCurrentUser
          ? 'Ty potwierdziłeś płatność.'
          : `${receiver?.name} potwierdził twoją płatność.`;
      case NotificationEvent.Paid:
        return isActorCurrentUser
          ? 'Ty zapłaciłeś za płatność.'
          : `${receiver?.name} zapłacił za płatność.`;
      default:
        return `Coś innego się jeszcze stało. ${event} w payment`;
    }
  };

  return (
    <ListItem
      avatarIcon={<MdReceipt />}
      date={createdAt}
      title={renderTitle()}
      onClick={handleClick}
      onRemove={handleDelete}
    />
  );
};
