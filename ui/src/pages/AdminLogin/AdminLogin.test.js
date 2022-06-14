import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event'

import Main from '../Main/Main';
import AdminLogin from './AdminLogin';

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/']}>
        <AdminLogin />
    </MemoryRouter>
  );
}

test('renders AdminLogin component successfully', () => {
  setup();
});

test('renders AdminLogin with an email login field', () => {
  setup();
  const inputEmail = screen.getByTestId('email-test');
  expect(inputEmail).toHaveAttribute("type","email");
});

test('renders AdminLogin with a password login field', () => {
  setup();
  const inputPass = screen.getByTestId('pass-test');
  expect(inputPass).toHaveAttribute("type","password");
});