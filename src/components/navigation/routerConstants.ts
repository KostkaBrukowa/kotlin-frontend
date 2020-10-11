export const loginRoute = '/login';
export const registerRoute = `${loginRoute}/register`;

export const notificationsRoute = '/notifications';

export const settingsRoute = '/settings';
export const friendsRoute = '/settings/friends';

export const expensesRoute = '/expenses';
export const paymentsRoute = `${expensesRoute}/payments`;
export const expenseFormRoute = `${expensesRoute}/expenseForm`;

export const eventsRoute = '/events';
export const eventFormRoute = `${eventsRoute}/eventForm`;
export const eventsEventRoute = `${eventsRoute}/event`;
export const eventsGroupRoute = `${eventsRoute}/group`;
export const eventsFiendsRoute = `${eventsRoute}/friends`;

export const nonAuthenticatedRoutes = [loginRoute, registerRoute];
