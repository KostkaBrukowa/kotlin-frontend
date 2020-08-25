import React from 'react';
import { MdReceipt } from 'react-icons/all';
import { navigate } from '@reach/router';

import { NotificationEvent } from '../../../generated/graphql';
import { renderPaymentTitle } from '../../enum-renderers/paymentNotification';
import { NotificationPaymentModel } from '../../mappers/notifications/NotificationMapperTypes';
import { expensesRoute } from '../../navigation/routerConstants';
import { ListItem } from './ListItem';

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

  return (
    <ListItem
      avatarIcon={<MdReceipt />}
      date={createdAt}
      title={renderPaymentTitle(event, actor?.id, userId, receiver)}
      onClick={handleClick}
      onRemove={handleDelete}
    />
  );
};
