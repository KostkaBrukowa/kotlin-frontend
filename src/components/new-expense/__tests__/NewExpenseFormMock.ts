import { MockedResponse } from '@apollo/client/utilities/testing/mocking/mockLink';

import { EditExpenseDataDocument, GetUserPartiesDocument } from '../../../generated/graphql';

const mockedPartiesResponse = {
  request: {
    query: GetUserPartiesDocument,
    variables: {
      userId: '1',
    },
  },
  result: {
    data: {
      getAllParties: [
        {
          id: '7',
          name: 'persistent party test name',
          description: 'test description',
          locationName: null,
          type: 'GROUP',
          owner: {
            name: 'persistent user test name',
          },
          partyParticipants: [
            {
              id: '1',
              name: 'persistent user test name',
            },
          ],
        },
        {
          id: '10',
          name: null,
          description: 'test description',
          locationName: null,
          type: 'FRIENDS',
          owner: {
            name: 'persistent user test name',
          },
          partyParticipants: [
            {
              id: '2',
              name: 'persistent user test name',
            },
            {
              id: '3',
              name: 'persistent user test name',
            },
            {
              id: '1',
              name: 'persistent user test name',
            },
          ],
        },
        {
          id: '12',
          name: 'logged party 2',
          description: 'test description',
          locationName: 'Niebo',
          type: 'EVENT',
          owner: {
            name: 'persistent user test name',
          },
          partyParticipants: [
            {
              id: '1',
              name: 'persistent user test name',
            },
            {
              id: '4',
              name: 'persistent user test name',
            },
            {
              id: '6',
              name: 'persistent user test name',
            },
            {
              id: '5',
              name: 'persistent user test name',
            },
          ],
        },
      ],
    },
  },
};
const mockedUpdateExpenseResponse = {
  request: {
    query: EditExpenseDataDocument,
    variables: {
      expenseId: '14',
    },
  },
  result: {
    data: {
      getSingleExpense: {
        id: '14',
        name: 'Test name',
        description: 'I bought a booze1111',
        expenseDate: '2020-09-26T11:55:43.924+02:00[Europe/Warsaw]',
        amount: 406.42,
        expenseStatus: 'IN_PROGRESS_REQUESTING',
        expenseParty: {
          id: '12',
          name: 'logged party 2',
          type: 'EVENT',
          partyParticipants: [
            {
              id: '4',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            {
              id: '5',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            {
              id: '1',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            {
              id: '6',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
          ],
          __typename: 'PartyType',
        },
        expensePayments: [
          {
            id: '15',
            paymentPayer: {
              id: '4',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            __typename: 'PaymentType',
          },
          {
            id: '16',
            paymentPayer: {
              id: '5',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            __typename: 'PaymentType',
          },
          {
            id: '17',
            paymentPayer: {
              id: '6',
              name: 'persistent user test name',
              __typename: 'UserType',
            },
            __typename: 'PaymentType',
          },
        ],
        __typename: 'ExpenseType',
      },
    },
  },
};

export const mocks: ReadonlyArray<MockedResponse> = [
  mockedPartiesResponse,
  mockedUpdateExpenseResponse,
];
