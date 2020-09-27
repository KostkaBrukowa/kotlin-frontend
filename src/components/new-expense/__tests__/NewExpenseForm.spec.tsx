import '../../utils/test/watchMediaMock';

import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/utilities/testing/mocking/mockLink';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider } from '../../config/UserProvider';
import { ExpenseForm, ExpenseFormProps } from '../ExpenseForm';
import { mocks } from './NewExpenseFormMock';

const buildNewExpenseForm = (
  customMocks?: ReadonlyArray<MockedResponse>,
  componentProps?: Partial<ExpenseFormProps>,
) => (
  <UserProvider userId="1">
    <MockedProvider addTypename mocks={customMocks || mocks}>
      <ExpenseForm {...componentProps} />
    </MockedProvider>
  </UserProvider>
);

describe('<NewExpenseForm />', () => {
  test('should show error when name is too short', async () => {
    // given
    const { getByLabelText, findByText } = render(buildNewExpenseForm());

    // when
    const nameField = getByLabelText('Nazwa wydatku');

    await userEvent.type(nameField, 'x');

    // then
    const errorMessage = await findByText('Pole nie może mieć mniej niż 3 znaków.');

    expect(errorMessage).toBeInTheDocument();
  });

  test('should show error when name is too long', async () => {
    // given
    const { getByLabelText, findByText } = render(buildNewExpenseForm());

    // when
    const nameField = getByLabelText('Nazwa wydatku');

    await userEvent.type(nameField, 'x'.repeat(51));

    // then
    const errorMessage = await findByText('Pole nie może mieć więcej niż 50 znaków.');

    expect(errorMessage).toBeInTheDocument();
  });

  test('should show group input correctly', async () => {
    // given
    const { getByLabelText, findByLabelText, queryByLabelText } = render(buildNewExpenseForm());

    // then
    expect(await queryByLabelText('Wybierz grupę:')).not.toBeInTheDocument();

    // when
    const eventRadioButton = getByLabelText('Wydarzenie');

    await userEvent.click(eventRadioButton);

    // then
    expect(await findByLabelText('Wybierz grupę:')).toBeInTheDocument();

    // when
    const groupRadioButton = getByLabelText('Grupa');

    await userEvent.click(groupRadioButton);

    // then
    expect(await findByLabelText('Wybierz grupę:')).toBeInTheDocument();

    // when
    const friendsRadioButton = getByLabelText('Znajomi');

    await userEvent.click(friendsRadioButton);

    // then
    await waitForElementToBeRemoved(() => queryByLabelText('Wybierz grupę:'));
  });

  test('Participants input should be disabled when no group is chosen', async () => {
    // given
    const { getByLabelText, findByLabelText, findByText } = render(buildNewExpenseForm());

    // when
    const eventRadioButton = getByLabelText('Wydarzenie');

    await userEvent.click(eventRadioButton);

    expect(await findByLabelText('Wybierz uczestników wydatku:')).toBeDisabled();

    // when
    const groupSelect = await findByLabelText('Wybierz grupę:');

    userEvent.click(groupSelect);
    userEvent.click(await findByText('logged party 2'));

    // then
    await waitFor(() => expect(getByLabelText('Wybierz uczestników wydatku:')).not.toBeDisabled());
  });

  test('should show modal when user edited expense amount', async () => {
    // given
    const { getByText, findByText, findByLabelText } = render(
      buildNewExpenseForm(undefined, { expenseId: '14' }),
    );

    // when
    const amountField = await findByLabelText('Ile zapłaciłeś:');

    await userEvent.clear(amountField);
    await userEvent.type(amountField, '2.22');

    // and
    await userEvent.click(getByText('Edytuj'));

    // then
    const modalTitle = await findByText('Edytujesz kwotę');

    expect(modalTitle).toBeInTheDocument();
  });

  test('should not show modal when user edited expense amount but is not in edit mode', async () => {
    // given
    const {
      getByText,
      findByText,
      findByLabelText,
      getByLabelText,
      getAllByText,
      queryByText,
    } = render(buildNewExpenseForm());

    // when
    await userEvent.type(await findByLabelText('Nazwa wydatku'), 'Test name');

    await userEvent.click(getByLabelText('Wydarzenie'));

    userEvent.click(await findByLabelText('Wybierz grupę:'));
    userEvent.click(await findByText('logged party 2'));

    userEvent.click(await findByLabelText('Wybierz uczestników wydatku:'));
    userEvent.click(await getAllByText('persistent user test name')[0]);

    await userEvent.type(getByLabelText('Ile zapłaciłeś:'), '10');

    await userEvent.click(getByLabelText('Kiedy zapłaciłeś:'));
    await userEvent.click(await findByText('Today'));

    await userEvent.type(getByLabelText('Opis wydatku:'), 'Test description');

    await userEvent.click(getByText('Utwórz wydatek'));

    await new Promise((r) => setTimeout(r, 0));

    // then
    expect(await queryByText('Edytujesz kwotę')).not.toBeInTheDocument();
  });

  test('should not show modal when user didnt edit expense amount', async () => {
    // given
    const { findByText, queryByText } = render(buildNewExpenseForm(undefined, { expenseId: '14' }));

    // when
    await userEvent.click(await findByText('Edytuj'));

    // then
    const modalTitle = await queryByText('Edytujesz kwotę');

    expect(modalTitle).not.toBeInTheDocument();
  });
});
