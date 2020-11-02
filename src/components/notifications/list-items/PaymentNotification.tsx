import React from 'react';
import { MdReceipt } from 'react-icons/all';
import { navigate } from '@reach/router';

import { renderPaymentTitle } from '../../enum-renderers/paymentNotification';
import { NotificationPaymentModel } from '../../mappers/notifications/NotificationMapperTypes';
import { expensesRoute } from '../../navigation/routerConstants';
import { ListItem } from './ListItem';

export interface PaymentNotificationProps {
  notificationModel: NotificationPaymentModel;
  userId: string | null;
}

export const PaymentNotification: React.FC<PaymentNotificationProps> = ({
  notificationModel: { id, actor, receiver, paymentId, createdAt, event, isRead },
  userId,
}) => {
  const handleClick = () => navigate(`${expensesRoute}/payments/${paymentId}`);

  return (
    <ListItem
      avatarIcon={<MdReceipt />}
      date={createdAt}
      isRead={isRead}
      notificationId={id}
      title={renderPaymentTitle(event, actor?.id, userId, receiver)}
      onClick={handleClick}
    />
  );
};
