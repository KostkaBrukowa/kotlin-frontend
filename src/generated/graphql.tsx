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
  name: Scalars['String'];
  startDate: Scalars['Date'];
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
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  expenseId: Scalars['Long'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
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
  description?: Maybe<Scalars['String']>;
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
  Expense = 'EXPENSE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Logs in user and return JWT token as return value */
  logIn?: Maybe<Scalars['String']>;
  /** Registers user and return JWT token as return value */
  refreshToken: Scalars['String'];
  /** Registers user and return JWT token as return value */
  signUp: Scalars['String'];
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
  messageId: Scalars['Long'];
  messageType: MessageType;
};


export type MutationMarkNotificationsAsReadArgs = {
  notificationsIds: Array<Scalars['Long']>;
};


export type MutationCreatePartyArgs = {
  newPartyInput: NewPartyInput;
};


export type MutationDeletePartyArgs = {
  id: Scalars['Long'];
};


export type MutationRemoveParticipantArgs = {
  partyId: Scalars['Long'];
  participantId: Scalars['Long'];
};


export type MutationUpdatePartyArgs = {
  id: Scalars['Long'];
  editPartyInput: EditPartyInput;
};


export type MutationAcceptPartyRequestArgs = {
  partyRequestId: Scalars['Long'];
};


export type MutationDeclinePartyRequestArgs = {
  partyRequestId: Scalars['Long'];
};


export type MutationRemovePartyRequestArgs = {
  partyRequestId: Scalars['Long'];
};


export type MutationSendPartyRequestArgs = {
  partyId: Scalars['Long'];
  requestReceiverId: Scalars['Long'];
};


export type MutationBulkPaymentsArgs = {
  paymentsIds: Array<Scalars['Long']>;
};


export type MutationUpdateBulkPaymentStatusArgs = {
  updatePaymentStatusInput: UpdateBulkPaymentStatusInput;
};


export type MutationUpdatePaymentStatusArgs = {
  updatePaymentStatusInput: UpdatePaymentStatusInput;
};


export type MutationAddFriendArgs = {
  userId: Scalars['Long'];
};


export type MutationRemoveFriendArgs = {
  userId: Scalars['Long'];
};

export type NewExpenseInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  name: Scalars['String'];
  participants: Array<Scalars['Long']>;
  partyId: Scalars['Long'];
};

export type NewMessageInput = {
  entityId: Scalars['Long'];
  messageType: MessageType;
  text: Scalars['String'];
};

export type NewPartyInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  participants?: Maybe<Array<Scalars['Long']>>;
  startDate: Scalars['Date'];
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
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
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
  name: Scalars['String'];
  owner?: Maybe<User>;
  participants: Array<User>;
  partyRequests: Array<PartyRequest>;
  startDate: Scalars['Date'];
};

export type PartyRequest = {
  __typename?: 'PartyRequest';
  id: Scalars['Long'];
  party?: Maybe<Party>;
  status: PartyRequestStatus;
  user?: Maybe<User>;
};

export type PartyRequestNotification = NotificationType & {
  __typename?: 'PartyRequestNotification';
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  partyId: Scalars['Long'];
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
  name: Scalars['String'];
  owner?: Maybe<User>;
  partyExpenses: Array<ExpenseType>;
  partyMessages: Array<MessageResponseType>;
  partyParticipants: Array<UserType>;
  partyPartyRequests: Array<PartyRequestType>;
  startDate: Scalars['Date'];
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
  createdAt: Scalars['Date'];
  event: NotificationEvent;
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  paymentId: Scalars['Long'];
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
  getTest: Scalars['String'];
  findUsersFriends: Array<UserType>;
  getUser?: Maybe<UserType>;
};


export type QueryGetExpensesForPartyArgs = {
  partyId: Scalars['Long'];
};


export type QueryGetExpensesForUserArgs = {
  userId: Scalars['Long'];
};


export type QueryGetSingleExpenseArgs = {
  expenseId: Scalars['Long'];
};


export type QueryFindUserNotificationsArgs = {
  userId: Scalars['Long'];
};


export type QueryGetAllPartiesArgs = {
  userId: Scalars['Long'];
};


export type QueryGetSinglePartyArgs = {
  partyId: Scalars['Long'];
};


export type QueryGetPartyRequestsForPartyArgs = {
  partyId: Scalars['Long'];
};


export type QueryGetPartyRequestsForUserArgs = {
  userId: Scalars['Long'];
};


export type QueryGetClientBulkPaymentsArgs = {
  userId: Scalars['Long'];
};


export type QueryGetClientsPaymentsArgs = {
  userId: Scalars['Long'];
};


export type QueryGetSinglePaymentArgs = {
  paymentId: Scalars['Long'];
};


export type QueryGetTestArgs = {
  paymentId: Scalars['Long'];
};


export type QueryFindUsersFriendsArgs = {
  userId: Scalars['Long'];
};


export type QueryGetUserArgs = {
  id: Scalars['Long'];
};

export enum Roles {
  User = 'USER'
}

export type UpdateBulkPaymentStatusInput = {
  id: Scalars['Long'];
  status: BulkPaymentStatus;
};

export type UpdateExpenseAmountInput = {
  amount: Scalars['Float'];
  id: Scalars['Long'];
};

export type UpdateExpenseInput = {
  description: Scalars['String'];
  expenseDate: Scalars['Date'];
  id: Scalars['Long'];
  name: Scalars['String'];
};

export type UpdateExpenseStatusInput = {
  expenseStatus: ExpenseStatus;
  id: Scalars['Long'];
};

export type UpdatePaymentStatusInput = {
  paymentId: Scalars['Long'];
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

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'refreshToken'>
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id'>
  )> }
);

export type LoginUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logIn'>
);

export type SignUpUserMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type SignUpUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);


export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken
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
export const GetUserDocument = gql`
    query GetUser {
  getUser(id: 1) {
    id
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: UserAuthInput!) {
  logIn(input: $input)
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
  signUp(input: $input)
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