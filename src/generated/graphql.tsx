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
  Confirmed = 'CONFIRMED',
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
  endDate: Scalars['Date'];
  locationLatitude?: Maybe<Scalars['Float']>;
  locationLongitude?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  startDate: Scalars['Date'];
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
  Resolved = 'RESOLVED',
}

export type ExpenseType = GqlResponseType & {
  __typename?: 'ExpenseType';
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  expenseMessages: Array<MessageResponseType>;
  expenseParty: PartyRequestType;
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
  Expense = 'EXPENSE',
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
  updateExpenseAmount: ExpenseType;
  createMessage: MessageResponseType;
  removeMessage: Scalars['Boolean'];
  markNotificationsAsRead: Scalars['Boolean'];
  createParty: PartyType;
  deleteParty: Scalars['Boolean'];
  removeParticipant: Scalars['Boolean'];
  updateParty: Party;
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

export type MutationUpdateExpenseAmountArgs = {
  updateExpenseAmountInput: UpdateExpenseAmountInput;
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
  id: Scalars['String'];
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
  Bulked = 'BULKED',
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
  PartyRequest = 'PARTY_REQUEST',
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
  startDate: Scalars['Date'];
  type: PartyKind;
};

export enum PartyKind {
  Event = 'EVENT',
  Group = 'GROUP',
  Friends = 'FRIENDS',
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
  InProgress = 'IN_PROGRESS',
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
  startDate: Scalars['Date'];
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
  Bulked = 'BULKED',
}

export type PaymentType = GqlResponseType & {
  __typename?: 'PaymentType';
  amount?: Maybe<Scalars['Float']>;
  confirmImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  paymentExpense: Expense;
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
  User = 'USER',
}

export type UpdateBulkPaymentStatusInput = {
  id: Scalars['String'];
  status: BulkPaymentStatus;
};

export type UpdateExpenseAmountInput = {
  amount: Scalars['Float'];
  id: Scalars['String'];
};

export type UpdateExpenseInput = {
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

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = { __typename?: 'Mutation' } & {
  refreshToken: { __typename?: 'UserAuthResponse' } & Pick<UserAuthResponse, 'token' | 'userId'>;
};

export type GetUserPartiesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type GetUserPartiesQuery = { __typename?: 'Query' } & {
  getAllParties: Array<
    { __typename?: 'PartyType' } & Pick<
      PartyType,
      'id' | 'name' | 'description' | 'locationName' | 'type'
    > & {
        owner?: Maybe<{ __typename?: 'User' } & Pick<User, 'name'>>;
        partyParticipants: Array<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
      }
  >;
};

export type GetUserExpensesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type GetUserExpensesQuery = { __typename?: 'Query' } & {
  getExpensesForUser: Array<
    { __typename?: 'ExpenseType' } & Pick<
      ExpenseType,
      'id' | 'amount' | 'description' | 'name' | 'expenseStatus'
    >
  >;
  getClientsPayments: Array<
    { __typename?: 'PaymentType' } & Pick<PaymentType, 'id' | 'amount' | 'status'> & {
        paymentExpense: { __typename?: 'Expense' } & Pick<
          Expense,
          'id' | 'description' | 'name' | 'expenseStatus'
        >;
      }
  >;
};

export type SingleExpenseQueryVariables = Exact<{
  expenseId: Scalars['String'];
}>;

export type SingleExpenseQuery = { __typename?: 'Query' } & {
  getSingleExpense?: Maybe<
    { __typename?: 'ExpenseType' } & Pick<
      ExpenseType,
      'id' | 'name' | 'description' | 'expenseDate' | 'amount' | 'expenseStatus'
    > & { expensePayer: { __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'> }
  >;
};

export type LoginUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  logIn?: Maybe<{ __typename?: 'UserAuthResponse' } & Pick<UserAuthResponse, 'token' | 'userId'>>;
};

export type SignUpUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;

export type SignUpUserMutation = { __typename?: 'Mutation' } & {
  signUp: { __typename?: 'UserAuthResponse' } & Pick<UserAuthResponse, 'token' | 'userId'>;
};

export type GetUserNotificationsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type GetUserNotificationsQuery = { __typename?: 'Query' } & {
  findUserNotifications: Array<
    | ({ __typename?: 'ExpenseNotification' } & Pick<
        ExpenseNotification,
        'expenseId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
      > & {
          actor?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
          receiver?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
        })
    | ({ __typename?: 'PartyRequestNotification' } & Pick<
        PartyRequestNotification,
        'partyId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
      > & {
          actor?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
          receiver?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
        })
    | ({ __typename?: 'PaymentNotification' } & Pick<
        PaymentNotification,
        'paymentId' | 'id' | 'createdAt' | 'isRead' | 'event' | 'type'
      > & {
          actor?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
          receiver?: Maybe<{ __typename?: 'UserType' } & Pick<UserType, 'id' | 'name'>>;
        })
  >;
};

export type GetUserDetailsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type GetUserDetailsQuery = { __typename?: 'Query' } & {
  getUser?: Maybe<
    { __typename?: 'UserType' } & Pick<UserType, 'id' | 'name' | 'bankAccount' | 'email'>
  >;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logOut'>;

export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      token
      userId
    }
  }
`;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

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
export function useRefreshTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
    baseOptions,
  );
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const GetUserPartiesDocument = gql`
  query GetUserParties($userId: String!) {
    getAllParties(userId: $userId) {
      id
      name
      description
      locationName
      owner {
        name
      }
      type
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
export function useGetUserPartiesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserPartiesQuery,
    GetUserPartiesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserPartiesQuery, GetUserPartiesQueryVariables>(
    GetUserPartiesDocument,
    baseOptions,
  );
}
export function useGetUserPartiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserPartiesQuery,
    GetUserPartiesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUserPartiesQuery, GetUserPartiesQueryVariables>(
    GetUserPartiesDocument,
    baseOptions,
  );
}
export type GetUserPartiesQueryHookResult = ReturnType<typeof useGetUserPartiesQuery>;
export type GetUserPartiesLazyQueryHookResult = ReturnType<typeof useGetUserPartiesLazyQuery>;
export type GetUserPartiesQueryResult = ApolloReactCommon.QueryResult<
  GetUserPartiesQuery,
  GetUserPartiesQueryVariables
>;
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
export function useGetUserExpensesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserExpensesQuery,
    GetUserExpensesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserExpensesQuery, GetUserExpensesQueryVariables>(
    GetUserExpensesDocument,
    baseOptions,
  );
}
export function useGetUserExpensesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserExpensesQuery,
    GetUserExpensesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUserExpensesQuery, GetUserExpensesQueryVariables>(
    GetUserExpensesDocument,
    baseOptions,
  );
}
export type GetUserExpensesQueryHookResult = ReturnType<typeof useGetUserExpensesQuery>;
export type GetUserExpensesLazyQueryHookResult = ReturnType<typeof useGetUserExpensesLazyQuery>;
export type GetUserExpensesQueryResult = ApolloReactCommon.QueryResult<
  GetUserExpensesQuery,
  GetUserExpensesQueryVariables
>;
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
export function useSingleExpenseQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SingleExpenseQuery, SingleExpenseQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SingleExpenseQuery, SingleExpenseQueryVariables>(
    SingleExpenseDocument,
    baseOptions,
  );
}
export function useSingleExpenseLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SingleExpenseQuery,
    SingleExpenseQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SingleExpenseQuery, SingleExpenseQueryVariables>(
    SingleExpenseDocument,
    baseOptions,
  );
}
export type SingleExpenseQueryHookResult = ReturnType<typeof useSingleExpenseQuery>;
export type SingleExpenseLazyQueryHookResult = ReturnType<typeof useSingleExpenseLazyQuery>;
export type SingleExpenseQueryResult = ApolloReactCommon.QueryResult<
  SingleExpenseQuery,
  SingleExpenseQueryVariables
>;
export const LoginUserDocument = gql`
  mutation LoginUser($input: UserAuthInput!) {
    logIn(input: $input) {
      token
      userId
    }
  }
`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>;

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
export function useLoginUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    baseOptions,
  );
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export const SignUpUserDocument = gql`
  mutation SignUpUser($input: UserAuthInput!) {
    signUp(input: $input) {
      token
      userId
    }
  }
`;
export type SignUpUserMutationFn = ApolloReactCommon.MutationFunction<
  SignUpUserMutation,
  SignUpUserMutationVariables
>;

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
export function useSignUpUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpUserMutation,
    SignUpUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(
    SignUpUserDocument,
    baseOptions,
  );
}
export type SignUpUserMutationHookResult = ReturnType<typeof useSignUpUserMutation>;
export type SignUpUserMutationResult = ApolloReactCommon.MutationResult<SignUpUserMutation>;
export type SignUpUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpUserMutation,
  SignUpUserMutationVariables
>;
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
export function useGetUserNotificationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserNotificationsQuery,
    GetUserNotificationsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(
    GetUserNotificationsDocument,
    baseOptions,
  );
}
export function useGetUserNotificationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserNotificationsQuery,
    GetUserNotificationsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserNotificationsQuery,
    GetUserNotificationsQueryVariables
  >(GetUserNotificationsDocument, baseOptions);
}
export type GetUserNotificationsQueryHookResult = ReturnType<typeof useGetUserNotificationsQuery>;
export type GetUserNotificationsLazyQueryHookResult = ReturnType<
  typeof useGetUserNotificationsLazyQuery
>;
export type GetUserNotificationsQueryResult = ApolloReactCommon.QueryResult<
  GetUserNotificationsQuery,
  GetUserNotificationsQueryVariables
>;
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
export function useGetUserDetailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserDetailsQuery,
    GetUserDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(
    GetUserDetailsDocument,
    baseOptions,
  );
}
export function useGetUserDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserDetailsQuery,
    GetUserDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(
    GetUserDetailsDocument,
    baseOptions,
  );
}
export type GetUserDetailsQueryHookResult = ReturnType<typeof useGetUserDetailsQuery>;
export type GetUserDetailsLazyQueryHookResult = ReturnType<typeof useGetUserDetailsLazyQuery>;
export type GetUserDetailsQueryResult = ApolloReactCommon.QueryResult<
  GetUserDetailsQuery,
  GetUserDetailsQueryVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logOut
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
