import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A type representing a formatted java.util.ZonedDateTime */
  Date: any;
  /** Long type */
  Long: any;
};

export enum BulkPaymentStatus {
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Confirmed = 'CONFIRMED'
}

export type BulkPaymentType = GqlResponseType & {
  __typename?: 'BulkPaymentType';
  amount?: Maybe<Scalars['Float']>;
  bulkPaymentMessages: Array<MessageResponseType>;
  bulkPaymentPayer: UserType;
  bulkPaymentPayments: Array<PaymentType>;
  bulkPaymentReceiver: UserType;
  confirmImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status: BulkPaymentStatus;
};


export type EditPartyInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  locationLatitude?: Maybe<Scalars['Float']>;
  locationLongitude?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  startDate?: Maybe<Scalars['Date']>;
  type: PartyKind;
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  expenseStatus: ExpenseStatus;
  id: Scalars['Long'];
  name: Scalars['String'];
  party?: Maybe<Party>;
  payments: Array<Payment>;
  user?: Maybe<User>;
};

export type ExpenseNotification = NotificationType & {
  __typename?: 'ExpenseNotification';
  actor?: Maybe<UserType>;
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  expenseId: Scalars['String'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  objectName?: Maybe<Scalars['String']>;
  receiver?: Maybe<UserType>;
  type: NotificationTypeEnum;
};

export enum ExpenseStatus {
  InProgressRequesting = 'IN_PROGRESS_REQUESTING',
  InProgressPaying = 'IN_PROGRESS_PAYING',
  Declined = 'DECLINED',
  Resolved = 'RESOLVED'
}

export type ExpenseType = GqlResponseType & {
  __typename?: 'ExpenseType';
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  expenseMessages: Array<MessageResponseType>;
  expenseParty: PartyType;
  expensePayer: UserType;
  expensePayments: Array<PaymentType>;
  expenseStatus: ExpenseStatus;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GqlResponseType = {
  id: Scalars['ID'];
};


export type MessageResponseType = GqlResponseType & {
  __typename?: 'MessageResponseType';
  id: Scalars['ID'];
  messageSender: UserType;
  sendDate: Scalars['Date'];
  text: Scalars['String'];
};

export enum MessageType {
  Party = 'PARTY',
  Payment = 'PAYMENT',
  BulkPayment = 'BULK_PAYMENT',
  Expense = 'EXPENSE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Logs in user and return JWT token as return value */
  logIn?: Maybe<UserAuthResponse>;
  /** Removes the cookie from request */
  logOut: Scalars['Boolean'];
  /** Registers user and return JWT token as return value */
  refreshToken: UserAuthResponse;
  /** Registers user and return JWT token as return value */
  signUp: UserAuthResponse;
  changeExpenseStatus: ExpenseType;
  createExpense: ExpenseType;
  deleteExpense: Scalars['Boolean'];
  updateExpense: ExpenseType;
  createMessage: MessageResponseType;
  removeMessage: Scalars['Boolean'];
  markNotificationsAsRead: Scalars['Boolean'];
  createParty: PartyType;
  deleteParty: Scalars['Boolean'];
  removeParticipant: Scalars['Boolean'];
  updateParty: PartyType;
  acceptPartyRequest: Scalars['Boolean'];
  declinePartyRequest: Scalars['Boolean'];
  removePartyRequest: Scalars['Boolean'];
  sendPartyRequest?: Maybe<PartyRequestType>;
  bulkPayments?: Maybe<BulkPaymentType>;
  updateBulkPaymentStatus: BulkPaymentType;
  updatePaymentStatus: PaymentType;
  addFriend: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
};


export type MutationLogInArgs = {
  input: UserAuthInput;
};


export type MutationSignUpArgs = {
  input: UserAuthInput;
};


export type MutationChangeExpenseStatusArgs = {
  updateExpenseStatusInput: UpdateExpenseStatusInput;
};


export type MutationCreateExpenseArgs = {
  newExpenseInput: NewExpenseInput;
};


export type MutationDeleteExpenseArgs = {
  expenseId: Scalars['Long'];
};


export type MutationUpdateExpenseArgs = {
  updateExpenseInput: UpdateExpenseInput;
};


export type MutationCreateMessageArgs = {
  newMessageInput: NewMessageInput;
};


export type MutationRemoveMessageArgs = {
  messageId: Scalars['String'];
  messageType: MessageType;
};


export type MutationMarkNotificationsAsReadArgs = {
  notificationsIds: Array<Scalars['String']>;
};


export type MutationCreatePartyArgs = {
  newPartyInput: NewPartyInput;
};


export type MutationDeletePartyArgs = {
  id: Scalars['String'];
};


export type MutationRemoveParticipantArgs = {
  partyId: Scalars['String'];
  participantId: Scalars['String'];
};


export type MutationUpdatePartyArgs = {
  editPartyInput: EditPartyInput;
};


export type MutationAcceptPartyRequestArgs = {
  partyRequestId: Scalars['String'];
};


export type MutationDeclinePartyRequestArgs = {
  partyRequestId: Scalars['String'];
};


export type MutationRemovePartyRequestArgs = {
  partyRequestId: Scalars['String'];
};


export type MutationSendPartyRequestArgs = {
  partyId: Scalars['String'];
  requestReceiverId: Scalars['String'];
};


export type MutationBulkPaymentsArgs = {
  paymentsIds: Array<Scalars['String']>;
};


export type MutationUpdateBulkPaymentStatusArgs = {
  updatePaymentStatusInput: UpdateBulkPaymentStatusInput;
};


export type MutationUpdatePaymentStatusArgs = {
  updatePaymentStatusInput: UpdatePaymentStatusInput;
};


export type MutationAddFriendArgs = {
  userId: Scalars['String'];
};


export type MutationRemoveFriendArgs = {
  userId: Scalars['String'];
};

export type NewExpenseInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  name: Scalars['String'];
  participants: Array<Scalars['String']>;
  partyId: Scalars['String'];
};

export type NewMessageInput = {
  entityId: Scalars['Long'];
  messageType: MessageType;
  text: Scalars['String'];
};

export type NewPartyInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  locationLatitude?: Maybe<Scalars['Float']>;
  locationLongitude?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  participants?: Maybe<Array<Scalars['Long']>>;
  startDate: Scalars['Date'];
  type: PartyKind;
};

export enum NotificationEvent {
  NewMessage = 'NEW_MESSAGE',
  Creation = 'CREATION',
  Modification = 'MODIFICATION',
  Deletion = 'DELETION',
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Paid = 'PAID',
  Confirmed = 'CONFIRMED',
  Bulked = 'BULKED'
}

export type NotificationType = {
  actor?: Maybe<UserType>;
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  objectName?: Maybe<Scalars['String']>;
  receiver?: Maybe<UserType>;
  type: NotificationTypeEnum;
};

export enum NotificationTypeEnum {
  Payment = 'PAYMENT',
  Expense = 'EXPENSE',
  PartyRequest = 'PARTY_REQUEST'
}

export type Party = {
  __typename?: 'Party';
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  expenses: Array<Expense>;
  id: Scalars['Long'];
  locationLatitude?: Maybe<Scalars['Float']>;
  locationLongitude?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  participants: Array<User>;
  partyRequests: Array<PartyRequest>;
  startDate?: Maybe<Scalars['Date']>;
  type: PartyKind;
};

export enum PartyKind {
  Event = 'EVENT',
  Group = 'GROUP',
  Friends = 'FRIENDS'
}

export type PartyRequest = {
  __typename?: 'PartyRequest';
  id: Scalars['Long'];
  party?: Maybe<Party>;
  status: PartyRequestStatus;
  user?: Maybe<User>;
};

export type PartyRequestNotification = NotificationType & {
  __typename?: 'PartyRequestNotification';
  actor?: Maybe<UserType>;
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  objectName?: Maybe<Scalars['String']>;
  partyId: Scalars['String'];
  receiver?: Maybe<UserType>;
  type: NotificationTypeEnum;
};

export enum PartyRequestStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  InProgress = 'IN_PROGRESS'
}

export type PartyRequestType = GqlResponseType & {
  __typename?: 'PartyRequestType';
  id: Scalars['ID'];
  partyRequestParty: PartyType;
  partyRequestReceiver: UserType;
  status: PartyRequestStatus;
};

export type PartyType = GqlResponseType & {
  __typename?: 'PartyType';
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  locationLatitude?: Maybe<Scalars['Float']>;
  locationLongitude?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  partyExpenses: Array<ExpenseType>;
  partyMessages: Array<MessageResponseType>;
  partyParticipants: Array<UserType>;
  partyPartyRequests: Array<PartyRequestType>;
  startDate?: Maybe<Scalars['Date']>;
  type: PartyKind;
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Float']>;
  confirmImageUrl?: Maybe<Scalars['String']>;
  expense?: Maybe<Expense>;
  id: Scalars['Long'];
  status: PaymentStatus;
  user?: Maybe<User>;
};

export type PaymentNotification = NotificationType & {
  __typename?: 'PaymentNotification';
  actor?: Maybe<UserType>;
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  objectName?: Maybe<Scalars['String']>;
  paymentId: Scalars['String'];
  receiver?: Maybe<UserType>;
  type: NotificationTypeEnum;
};

export enum PaymentStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Confirmed = 'CONFIRMED',
  Bulked = 'BULKED'
}

export type PaymentType = GqlResponseType & {
  __typename?: 'PaymentType';
  amount?: Maybe<Scalars['Float']>;
  confirmImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  paymentExpense: ExpenseType;
  paymentMessages: Array<MessageResponseType>;
  paymentPayer: UserType;
  status: PaymentStatus;
};

export type Query = {
  __typename?: 'Query';
  getExpensesForParty: Array<ExpenseType>;
  getExpensesForUser: Array<ExpenseType>;
  getSingleExpense?: Maybe<ExpenseType>;
  findUserNotifications: Array<NotificationType>;
  getAllParties: Array<PartyType>;
  getSingleParty?: Maybe<PartyType>;
  getPartyRequestsForParty: Array<PartyRequestType>;
  getPartyRequestsForUser: Array<PartyRequestType>;
  getClientBulkPayments: Array<BulkPaymentType>;
  getClientsPayments: Array<PaymentType>;
  getSinglePayment?: Maybe<PaymentType>;
  findUsersFriends: Array<UserType>;
  getUser?: Maybe<UserType>;
};


export type QueryGetExpensesForPartyArgs = {
  partyId: Scalars['String'];
};


export type QueryGetExpensesForUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetSingleExpenseArgs = {
  expenseId: Scalars['String'];
};


export type QueryFindUserNotificationsArgs = {
  userId: Scalars['String'];
};


export type QueryGetAllPartiesArgs = {
  userId: Scalars['String'];
};


export type QueryGetSinglePartyArgs = {
  partyId: Scalars['String'];
};


export type QueryGetPartyRequestsForPartyArgs = {
  partyId: Scalars['String'];
};


export type QueryGetPartyRequestsForUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetClientBulkPaymentsArgs = {
  userId: Scalars['String'];
};


export type QueryGetClientsPaymentsArgs = {
  userId: Scalars['String'];
};


export type QueryGetSinglePaymentArgs = {
  paymentId: Scalars['String'];
};


export type QueryFindUsersFriendsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export enum Roles {
  User = 'USER'
}

export type UpdateBulkPaymentStatusInput = {
  id: Scalars['String'];
  status: BulkPaymentStatus;
};

export type UpdateExpenseInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateExpenseStatusInput = {
  expenseStatus: ExpenseStatus;
  id: Scalars['String'];
};

export type UpdatePaymentStatusInput = {
  paymentId: Scalars['String'];
  status: PaymentStatus;
};

export type User = {
  __typename?: 'User';
  bankAccount?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  expenses: Array<Expense>;
  friendOf: Array<User>;
  friends: Array<User>;
  id: Scalars['Long'];
  joinedParties: Array<Party>;
  name?: Maybe<Scalars['String']>;
  partyRequests: Array<PartyRequest>;
  payments: Array<Payment>;
};

export type UserAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserAuthResponse = {
  __typename?: 'UserAuthResponse';
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type UserType = GqlResponseType & {
  __typename?: 'UserType';
  bankAccount?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  userExpenses: Array<ExpenseType>;
  userJoinedParties: Array<PartyType>;
  userPartyRequests: Array<PartyRequestType>;
  userPayments: Array<PaymentType>;
};

export type ParticipantListFragmentFragment = { __typename?: 'UserType', id: string, name?: Maybe<string> };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'UserAuthResponse', token: string, userId: string } };

export type GetUserPartiesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserPartiesQuery = { __typename?: 'Query', getAllParties: Array<{ __typename?: 'PartyType', id: string, name?: Maybe<string>, description?: Maybe<string>, locationName?: Maybe<string>, type: PartyKind, owner?: Maybe<{ __typename?: 'User', name?: Maybe<string> }>, partyParticipants: Array<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> }> };

export type SingleEventQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type SingleEventQuery = { __typename?: 'Query', getSingleParty?: Maybe<{ __typename?: 'PartyType', id: string, name?: Maybe<string>, description?: Maybe<string>, locationName?: Maybe<string>, type: PartyKind, startDate?: Maybe<any>, endDate?: Maybe<any>, locationLatitude?: Maybe<number>, locationLongitude?: Maybe<number>, owner?: Maybe<{ __typename?: 'User', name?: Maybe<string> }>, partyParticipants: Array<(
      { __typename?: 'UserType' }
      & ParticipantListFragmentFragment
    )>, partyMessages: Array<(
      { __typename?: 'MessageResponseType' }
      & MessageDetailsFragment
    )>, partyPartyRequests: Array<{ __typename?: 'PartyRequestType', id: string, status: PartyRequestStatus, partyRequestReceiver: { __typename?: 'UserType', id: string, name?: Maybe<string> } }>, partyExpenses: Array<{ __typename?: 'ExpenseType', id: string, amount: number, description: string, expenseStatus: ExpenseStatus, name: string, expensePayer: { __typename?: 'UserType', id: string, name?: Maybe<string> } }> }> };

export type CreateEventMutationVariables = Exact<{
  event: NewPartyInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createParty: { __typename?: 'PartyType', id: string, name?: Maybe<string>, description?: Maybe<string>, locationName?: Maybe<string>, type: PartyKind, startDate?: Maybe<any>, endDate?: Maybe<any>, locationLatitude?: Maybe<number>, locationLongitude?: Maybe<number>, owner?: Maybe<{ __typename?: 'User', name?: Maybe<string> }>, partyParticipants: Array<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> } };

export type GetUserFriendsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserFriendsQuery = { __typename?: 'Query', findUsersFriends: Array<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> };

export type UpdateEventMutationVariables = Exact<{
  event: EditPartyInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateParty: { __typename?: 'PartyType', id: string, name?: Maybe<string>, description?: Maybe<string>, locationName?: Maybe<string>, type: PartyKind, startDate?: Maybe<any>, endDate?: Maybe<any>, locationLatitude?: Maybe<number>, locationLongitude?: Maybe<number>, owner?: Maybe<{ __typename?: 'User', name?: Maybe<string> }>, partyParticipants: Array<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> } };

export type GetUserExpensesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserExpensesQuery = { __typename?: 'Query', getExpensesForUser: Array<{ __typename?: 'ExpenseType', id: string, amount: number, description: string, name: string, expenseStatus: ExpenseStatus }>, getClientsPayments: Array<{ __typename?: 'PaymentType', id: string, amount?: Maybe<number>, status: PaymentStatus, paymentExpense: { __typename?: 'ExpenseType', id: string, description: string, name: string, expenseStatus: ExpenseStatus } }> };

export type SingleExpenseQueryVariables = Exact<{
  expenseId: Scalars['String'];
}>;


export type SingleExpenseQuery = { __typename?: 'Query', getSingleExpense?: Maybe<{ __typename?: 'ExpenseType', id: string, name: string, description: string, expenseDate: any, amount: number, expenseStatus: ExpenseStatus, expensePayer: { __typename?: 'UserType', id: string, name?: Maybe<string> }, expensePayments: Array<{ __typename?: 'PaymentType', id: string, amount?: Maybe<number>, status: PaymentStatus, paymentPayer: { __typename?: 'UserType', id: string, name?: Maybe<string> } }> }> };

export type SinglePaymentQueryVariables = Exact<{
  paymentId: Scalars['String'];
}>;


export type SinglePaymentQuery = { __typename?: 'Query', getSinglePayment?: Maybe<{ __typename?: 'PaymentType', id: string, amount?: Maybe<number>, status: PaymentStatus, paymentMessages: Array<(
      { __typename?: 'MessageResponseType' }
      & MessageDetailsFragment
    )>, paymentExpense: { __typename?: 'ExpenseType', id: string, name: string, expensePayer: { __typename?: 'UserType', id: string, name?: Maybe<string> } }, paymentPayer: { __typename?: 'UserType', id: string, name?: Maybe<string> } }> };

export type LoginUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', logIn?: Maybe<{ __typename?: 'UserAuthResponse', token: string, userId: string }> };

export type SignUpUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserAuthResponse', token: string, userId: string } };

export type CreateExpenseMutationVariables = Exact<{
  expense: NewExpenseInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: { __typename?: 'ExpenseType', id: string, amount: number, description: string, name: string, expenseStatus: ExpenseStatus } };

export type EditExpenseDataQueryVariables = Exact<{
  expenseId: Scalars['String'];
}>;


export type EditExpenseDataQuery = { __typename?: 'Query', getSingleExpense?: Maybe<{ __typename?: 'ExpenseType', id: string, name: string, description: string, expenseDate: any, amount: number, expenseStatus: ExpenseStatus, expenseParty: { __typename?: 'PartyType', id: string, name?: Maybe<string>, type: PartyKind, partyParticipants: Array<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> }, expensePayments: Array<{ __typename?: 'PaymentType', id: string, paymentPayer: { __typename?: 'UserType', id: string, name?: Maybe<string> } }> }> };

export type UpdateExpenseMutationVariables = Exact<{
  expense: UpdateExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: { __typename?: 'ExpenseType', id: string, amount: number, description: string, name: string, expenseStatus: ExpenseStatus } };

export type GetUserNotificationsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserNotificationsQuery = { __typename?: 'Query', findUserNotifications: Array<{ __typename?: 'ExpenseNotification', expenseId: string, id: string, createdAt: any, isRead: boolean, event: NotificationEvent, type: NotificationTypeEnum, actor?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }>, receiver?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> } | { __typename?: 'PartyRequestNotification', partyId: string, id: string, createdAt: any, isRead: boolean, event: NotificationEvent, type: NotificationTypeEnum, actor?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }>, receiver?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> } | { __typename?: 'PaymentNotification', paymentId: string, id: string, createdAt: any, isRead: boolean, event: NotificationEvent, type: NotificationTypeEnum, actor?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }>, receiver?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string> }> }> };

export type GetUserDetailsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserDetailsQuery = { __typename?: 'Query', getUser?: Maybe<{ __typename?: 'UserType', id: string, name?: Maybe<string>, bankAccount?: Maybe<string>, email: string }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type MessageDetailsFragment = { __typename?: 'MessageResponseType', id: string, sendDate: any, text: string, messageSender: { __typename?: 'UserType', id: string, name?: Maybe<string> } };

export const ParticipantListFragmentFragmentDoc = gql`
    fragment ParticipantListFragment on UserType {
  id
  name
}
    `;
export const MessageDetailsFragmentDoc = gql`
    fragment MessageDetails on MessageResponseType {
  id
  sendDate
  text
  messageSender {
    id
    name
  }
}
    `;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    token
    userId
  }
}
    `;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, baseOptions);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetUserPartiesDocument = gql`
    query GetUserParties($userId: String!) {
  getAllParties(userId: $userId) {
    id
    name
    description
    locationName
    type
    owner {
      name
    }
    partyParticipants {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserPartiesQuery__
 *
 * To run a query within a React component, call `useGetUserPartiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPartiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPartiesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPartiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserPartiesQuery, GetUserPartiesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserPartiesQuery, GetUserPartiesQueryVariables>(GetUserPartiesDocument, baseOptions);
      }
export function useGetUserPartiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserPartiesQuery, GetUserPartiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserPartiesQuery, GetUserPartiesQueryVariables>(GetUserPartiesDocument, baseOptions);
        }
export type GetUserPartiesQueryHookResult = ReturnType<typeof useGetUserPartiesQuery>;
export type GetUserPartiesLazyQueryHookResult = ReturnType<typeof useGetUserPartiesLazyQuery>;
export type GetUserPartiesQueryResult = ApolloReactCommon.QueryResult<GetUserPartiesQuery, GetUserPartiesQueryVariables>;
export const SingleEventDocument = gql`
    query SingleEvent($eventId: String!) {
  getSingleParty(partyId: $eventId) {
    id
    name
    description
    locationName
    type
    startDate
    endDate
    locationLatitude
    locationLongitude
    owner {
      name
    }
    partyParticipants {
      ...ParticipantListFragment
    }
    partyMessages {
      ...MessageDetails
    }
    partyPartyRequests {
      id
      status
      partyRequestReceiver {
        id
        name
      }
    }
    partyExpenses {
      id
      amount
      description
      expenseStatus
      name
      expensePayer {
        id
        name
      }
    }
  }
}
    ${ParticipantListFragmentFragmentDoc}
${MessageDetailsFragmentDoc}`;

/**
 * __useSingleEventQuery__
 *
 * To run a query within a React component, call `useSingleEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useSingleEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingleEventQuery, SingleEventQueryVariables>) {
        return ApolloReactHooks.useQuery<SingleEventQuery, SingleEventQueryVariables>(SingleEventDocument, baseOptions);
      }
export function useSingleEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingleEventQuery, SingleEventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SingleEventQuery, SingleEventQueryVariables>(SingleEventDocument, baseOptions);
        }
export type SingleEventQueryHookResult = ReturnType<typeof useSingleEventQuery>;
export type SingleEventLazyQueryHookResult = ReturnType<typeof useSingleEventLazyQuery>;
export type SingleEventQueryResult = ApolloReactCommon.QueryResult<SingleEventQuery, SingleEventQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: NewPartyInput!) {
  createParty(newPartyInput: $event) {
    id
    name
    description
    locationName
    type
    startDate
    endDate
    locationLatitude
    locationLongitude
    owner {
      name
    }
    partyParticipants {
      id
      name
    }
  }
}
    `;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const GetUserFriendsDocument = gql`
    query GetUserFriends($userId: String!) {
  findUsersFriends(userId: $userId) {
    id
    name
  }
}
    `;

/**
 * __useGetUserFriendsQuery__
 *
 * To run a query within a React component, call `useGetUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFriendsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, baseOptions);
      }
export function useGetUserFriendsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, baseOptions);
        }
export type GetUserFriendsQueryHookResult = ReturnType<typeof useGetUserFriendsQuery>;
export type GetUserFriendsLazyQueryHookResult = ReturnType<typeof useGetUserFriendsLazyQuery>;
export type GetUserFriendsQueryResult = ApolloReactCommon.QueryResult<GetUserFriendsQuery, GetUserFriendsQueryVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($event: EditPartyInput!) {
  updateParty(editPartyInput: $event) {
    id
    name
    description
    locationName
    type
    startDate
    endDate
    locationLatitude
    locationLongitude
    owner {
      name
    }
    partyParticipants {
      id
      name
    }
  }
}
    `;
export type UpdateEventMutationFn = ApolloReactCommon.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = ApolloReactCommon.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const GetUserExpensesDocument = gql`
    query GetUserExpenses($userId: String!) {
  getExpensesForUser(userId: $userId) {
    id
    amount
    description
    name
    expenseStatus
  }
  getClientsPayments(userId: $userId) {
    id
    amount
    status
    paymentExpense {
      id
      description
      name
      expenseStatus
    }
  }
}
    `;

/**
 * __useGetUserExpensesQuery__
 *
 * To run a query within a React component, call `useGetUserExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserExpensesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserExpensesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserExpensesQuery, GetUserExpensesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserExpensesQuery, GetUserExpensesQueryVariables>(GetUserExpensesDocument, baseOptions);
      }
export function useGetUserExpensesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserExpensesQuery, GetUserExpensesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserExpensesQuery, GetUserExpensesQueryVariables>(GetUserExpensesDocument, baseOptions);
        }
export type GetUserExpensesQueryHookResult = ReturnType<typeof useGetUserExpensesQuery>;
export type GetUserExpensesLazyQueryHookResult = ReturnType<typeof useGetUserExpensesLazyQuery>;
export type GetUserExpensesQueryResult = ApolloReactCommon.QueryResult<GetUserExpensesQuery, GetUserExpensesQueryVariables>;
export const SingleExpenseDocument = gql`
    query SingleExpense($expenseId: String!) {
  getSingleExpense(expenseId: $expenseId) {
    id
    name
    description
    expenseDate
    amount
    expenseStatus
    expensePayer {
      id
      name
    }
    expensePayments {
      id
      amount
      status
      paymentPayer {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useSingleExpenseQuery__
 *
 * To run a query within a React component, call `useSingleExpenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleExpenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleExpenseQuery({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useSingleExpenseQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingleExpenseQuery, SingleExpenseQueryVariables>) {
        return ApolloReactHooks.useQuery<SingleExpenseQuery, SingleExpenseQueryVariables>(SingleExpenseDocument, baseOptions);
      }
export function useSingleExpenseLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingleExpenseQuery, SingleExpenseQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SingleExpenseQuery, SingleExpenseQueryVariables>(SingleExpenseDocument, baseOptions);
        }
export type SingleExpenseQueryHookResult = ReturnType<typeof useSingleExpenseQuery>;
export type SingleExpenseLazyQueryHookResult = ReturnType<typeof useSingleExpenseLazyQuery>;
export type SingleExpenseQueryResult = ApolloReactCommon.QueryResult<SingleExpenseQuery, SingleExpenseQueryVariables>;
export const SinglePaymentDocument = gql`
    query SinglePayment($paymentId: String!) {
  getSinglePayment(paymentId: $paymentId) {
    id
    amount
    status
    paymentMessages {
      ...MessageDetails
    }
    paymentExpense {
      id
      name
      expensePayer {
        id
        name
      }
    }
    paymentPayer {
      id
      name
    }
  }
}
    ${MessageDetailsFragmentDoc}`;

/**
 * __useSinglePaymentQuery__
 *
 * To run a query within a React component, call `useSinglePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePaymentQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useSinglePaymentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SinglePaymentQuery, SinglePaymentQueryVariables>) {
        return ApolloReactHooks.useQuery<SinglePaymentQuery, SinglePaymentQueryVariables>(SinglePaymentDocument, baseOptions);
      }
export function useSinglePaymentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SinglePaymentQuery, SinglePaymentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SinglePaymentQuery, SinglePaymentQueryVariables>(SinglePaymentDocument, baseOptions);
        }
export type SinglePaymentQueryHookResult = ReturnType<typeof useSinglePaymentQuery>;
export type SinglePaymentLazyQueryHookResult = ReturnType<typeof useSinglePaymentLazyQuery>;
export type SinglePaymentQueryResult = ApolloReactCommon.QueryResult<SinglePaymentQuery, SinglePaymentQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: UserAuthInput!) {
  logIn(input: $input) {
    token
    userId
  }
}
    `;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const SignUpUserDocument = gql`
    mutation SignUpUser($input: UserAuthInput!) {
  signUp(input: $input) {
    token
    userId
  }
}
    `;
export type SignUpUserMutationFn = ApolloReactCommon.MutationFunction<SignUpUserMutation, SignUpUserMutationVariables>;

/**
 * __useSignUpUserMutation__
 *
 * To run a mutation, you first call `useSignUpUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUserMutation, { data, loading, error }] = useSignUpUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpUserMutation, SignUpUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(SignUpUserDocument, baseOptions);
      }
export type SignUpUserMutationHookResult = ReturnType<typeof useSignUpUserMutation>;
export type SignUpUserMutationResult = ApolloReactCommon.MutationResult<SignUpUserMutation>;
export type SignUpUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpUserMutation, SignUpUserMutationVariables>;
export const CreateExpenseDocument = gql`
    mutation CreateExpense($expense: NewExpenseInput!) {
  createExpense(newExpenseInput: $expense) {
    id
    amount
    description
    name
    expenseStatus
  }
}
    `;
export type CreateExpenseMutationFn = ApolloReactCommon.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      expense: // value for 'expense'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, baseOptions);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = ApolloReactCommon.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const EditExpenseDataDocument = gql`
    query EditExpenseData($expenseId: String!) {
  getSingleExpense(expenseId: $expenseId) {
    id
    name
    description
    expenseDate
    amount
    expenseStatus
    expenseParty {
      id
      name
      type
      partyParticipants {
        id
        name
      }
    }
    expensePayments {
      id
      paymentPayer {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useEditExpenseDataQuery__
 *
 * To run a query within a React component, call `useEditExpenseDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditExpenseDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditExpenseDataQuery({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useEditExpenseDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EditExpenseDataQuery, EditExpenseDataQueryVariables>) {
        return ApolloReactHooks.useQuery<EditExpenseDataQuery, EditExpenseDataQueryVariables>(EditExpenseDataDocument, baseOptions);
      }
export function useEditExpenseDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EditExpenseDataQuery, EditExpenseDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EditExpenseDataQuery, EditExpenseDataQueryVariables>(EditExpenseDataDocument, baseOptions);
        }
export type EditExpenseDataQueryHookResult = ReturnType<typeof useEditExpenseDataQuery>;
export type EditExpenseDataLazyQueryHookResult = ReturnType<typeof useEditExpenseDataLazyQuery>;
export type EditExpenseDataQueryResult = ApolloReactCommon.QueryResult<EditExpenseDataQuery, EditExpenseDataQueryVariables>;
export const UpdateExpenseDocument = gql`
    mutation UpdateExpense($expense: UpdateExpenseInput!) {
  updateExpense(updateExpenseInput: $expense) {
    id
    amount
    description
    name
    expenseStatus
  }
}
    `;
export type UpdateExpenseMutationFn = ApolloReactCommon.MutationFunction<UpdateExpenseMutation, UpdateExpenseMutationVariables>;

/**
 * __useUpdateExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenseMutation, { data, loading, error }] = useUpdateExpenseMutation({
 *   variables: {
 *      expense: // value for 'expense'
 *   },
 * });
 */
export function useUpdateExpenseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(UpdateExpenseDocument, baseOptions);
      }
export type UpdateExpenseMutationHookResult = ReturnType<typeof useUpdateExpenseMutation>;
export type UpdateExpenseMutationResult = ApolloReactCommon.MutationResult<UpdateExpenseMutation>;
export type UpdateExpenseMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const GetUserNotificationsDocument = gql`
    query GetUserNotifications($userId: String!) {
  findUserNotifications(userId: $userId) {
    id
    createdAt
    isRead
    event
    type
    actor {
      id
      name
    }
    receiver {
      id
      name
    }
    ... on ExpenseNotification {
      expenseId
    }
    ... on PartyRequestNotification {
      partyId
    }
    ... on PaymentNotification {
      paymentId
    }
  }
}
    `;

/**
 * __useGetUserNotificationsQuery__
 *
 * To run a query within a React component, call `useGetUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNotificationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(GetUserNotificationsDocument, baseOptions);
      }
export function useGetUserNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(GetUserNotificationsDocument, baseOptions);
        }
export type GetUserNotificationsQueryHookResult = ReturnType<typeof useGetUserNotificationsQuery>;
export type GetUserNotificationsLazyQueryHookResult = ReturnType<typeof useGetUserNotificationsLazyQuery>;
export type GetUserNotificationsQueryResult = ApolloReactCommon.QueryResult<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>;
export const GetUserDetailsDocument = gql`
    query GetUserDetails($userId: String!) {
  getUser(id: $userId) {
    id
    name
    bankAccount
    email
  }
}
    `;

/**
 * __useGetUserDetailsQuery__
 *
 * To run a query within a React component, call `useGetUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, baseOptions);
      }
export function useGetUserDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, baseOptions);
        }
export type GetUserDetailsQueryHookResult = ReturnType<typeof useGetUserDetailsQuery>;
export type GetUserDetailsLazyQueryHookResult = ReturnType<typeof useGetUserDetailsLazyQuery>;
export type GetUserDetailsQueryResult = ApolloReactCommon.QueryResult<GetUserDetailsQuery, GetUserDetailsQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logOut
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;