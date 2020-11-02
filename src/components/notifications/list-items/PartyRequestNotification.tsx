import React from 'react';
import { BsFillEnvelopeFill } from 'react-icons/all';
import { navigate } from '@reach/router';

import { NotificationEvent } from '../../../generated/graphql';
import { NotificationPartyRequestModel } from '../../mappers/notifications/NotificationMapperTypes';
import { unknownEventTypeRoute } from '../../navigation/routerConstants';
import { ListItem } from './ListItem';

export interface PartyRequestNotificationProps {
  notificationModel: NotificationPartyRequestModel;
  userId: string | null;
}

export const PartyRequestNotification: React.FC<PartyRequestNotificationProps> = ({
  notificationModel: { id, actor, receiver, partyId, createdAt, event, isRead },
  userId,
}) => {
  const handleClick = () => navigate(`${unknownEventTypeRoute}/${partyId}`);

  const renderTitle = () => {
    const isActorCurrentUser = actor?.id === userId;

    switch (event) {
      case NotificationEvent.Creation:
        return isActorCurrentUser
          ? `Ty zaprosiłeś ${receiver?.name} na wydarzenie.`
          : `${receiver?.name} zaprosił cię na imprezę.`;
      case NotificationEvent.Accepted:
        return isActorCurrentUser
          ? 'Przyjąłeś zaproszenie na imprezę.'
          : `${receiver?.name} przyjął zaproszenie na wydarzenie.`;
      case NotificationEvent.Declined:
        return isActorCurrentUser
          ? 'Odrzuciłeś zaproszenie na imprezę.'
          : `${receiver?.name} odrzucił zaproszenie na wydarzenie.`;
      case NotificationEvent.Deletion:
        return isActorCurrentUser
          ? 'Usunąłeś zaproszenie na imprezę.'
          : `${receiver?.name} usunął zaproszenie na wydarzenie.`;
      default:
        return `Coś innego się jeszcze stało. ${event} w party request`;
    }
  };

  return (
    <ListItem
      avatarIcon={<BsFillEnvelopeFill />}
      date={createdAt}
      isRead={isRead}
      notificationId={id}
      title={renderTitle()}
      onClick={handleClick}
    />
  );
};
