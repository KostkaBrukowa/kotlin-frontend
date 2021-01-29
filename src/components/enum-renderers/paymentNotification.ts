import { NotificationEvent } from '../../generated/graphql';
import { NotificationUser } from '../mappers/notifications/NotificationMapperTypes';
import { Optional } from '../utils/types';

export const renderPaymentTitle = (
  event: NotificationEvent,
  actor: NotificationUser | null,
  userId: Optional<string>,
) => {
  const isActorCurrentUser = actor?.id === userId;

  switch (event) {
    case NotificationEvent.Creation:
      return isActorCurrentUser ? 'Ty stworzyłeś płatność.' : `${actor?.name} stworzył wydatek.`;
    case NotificationEvent.Accepted:
      return isActorCurrentUser
        ? 'Ty zaakceptowałeś płatność.'
        : `${actor?.name} zaakceptował płatność.`;
    case NotificationEvent.Declined:
      return isActorCurrentUser ? 'Ty odrzuciłeś płatność.' : `${actor?.name} odrzucił płatność.`;
    case NotificationEvent.Deletion:
      return isActorCurrentUser ? 'Usunąłeś płatność.' : `${actor?.name} usunął płatność.`;
    case NotificationEvent.Confirmed:
      return isActorCurrentUser
        ? 'Ty potwierdziłeś płatność.'
        : `${actor?.name} potwierdził twoją płatność.`;
    case NotificationEvent.Paid:
      return isActorCurrentUser
        ? 'Ty zapłaciłeś za płatność.'
        : `${actor?.name} zapłacił za płatność.`;
    default:
      return `Coś innego się jeszcze stało. ${event} w payment`;
  }
};
