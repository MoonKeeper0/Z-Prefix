import { render, screen } from '@testing-library/react';
import Header from './Header';

import { MemoryRouter } from 'react-router';

import userEvent from '@testing-library/user-event'

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/admin/login']}>
      <Header />
    </MemoryRouter>
  );
}

test('renders Header component successfully', () => {
  setup();
});

test('renders Header with a Admin Login Button Option', () => {
  setup();
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

//Note: this needs to be tested by Cypress
// test('clicking the Admin Login button shows an Admin Login form', async () => {
//   setup();
//   const button = screen.getByRole('button');
//   userEvent.click(button);
//   expect(await screen.findByText(/email/i)).toBeInTheDocument();
// });