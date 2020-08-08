import { NotificationEvent } from '../../generated/graphql';
import { Optional } from '../utils/types';
import { NotificationUser } from '../mappers/notifications/NotificationMapperTypes';

export const renderPaymentTitle = (
  event: NotificationEvent,
  actorId: Optional<string>,
  userId: Optional<string>,
  receiver: NotificationUser | null,
) => {
  const isActorCurrentUser = actorId === userId;

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
