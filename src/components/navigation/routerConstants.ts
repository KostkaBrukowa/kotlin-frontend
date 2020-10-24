export const loginRoute = '/login';
export const registerRoute = `${loginRoute}/register`;

export const notificationsRoute = '/notifications';

export const userRoute = '/users';
export const settingsRoute = `${userRoute}/settings`;
export const friendsRoute = '/settings/friends';

export const expensesRoute = '/expenses';
export const paymentsRoute = `${expensesRoute}/payments`;
export const expenseFormRoute = `${expensesRoute}/expenseForm`;

export const eventsRoute = '/events';
export const unknownEventTypeRoute = `${eventsRoute}/unknown`;
export const eventFormRoute = `${eventsRoute}/eventForm`;
export const eventsEventRoute = `${eventsRoute}/event`;
export const eventsGroupRoute = `${eventsRoute}/group`;
export const eventsFriendsRoute = `${eventsRoute}/friends`;

export const nonAuthenticatedRoutes = [loginRoute, registerRoute];
