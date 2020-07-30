import React from 'react';
import { render } from '@testing-library/react';
import { TotalBalance } from '../TotalBalance';

test('renders learn react link', () => {
  const { getByText } = render(<TotalBalance />);
  const linkElement = getByText(/Całkowity bilans/i);

  expect(linkElement).toBeInTheDocument();
});
