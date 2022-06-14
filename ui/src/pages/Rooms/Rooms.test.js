import { render, screen } from '@testing-library/react';
import {MemoryRouter, MemoryRouter as Router} from 'react-router';
import Rooms from './Rooms';

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/rooms']}>
      <Rooms />
    </MemoryRouter>
  );
}

test('renders Rooms component successfully', () => {
  setup();
});

test('renders on /rooms route with Building and Room number shown', () => {
  setup();
  expect(screen.getByText(/Building/i)).toBeInTheDocument();
  expect(screen.getByText(/Orange/i)).toBeInTheDocument();
  expect(screen.getByText(/Yellow/i)).toBeInTheDocument();
  expect(screen.getByText(/Red/i)).toBeInTheDocument();
  expect(screen.getByText(/Green/i)).toBeInTheDocument();
  expect(screen.getByText(/164/i)).toBeInTheDocument();
});

test('renders on /rooms route with Building&Room entry linked to /rooms/:id route', () => {
  setup();
  expect(screen.getByText('Orange')).toHaveAttribute('href', '/rooms/1');
  expect(screen.getByText('Yellow')).toHaveAttribute('href', '/rooms/2');
  expect(screen.getByText('Red')).toHaveAttribute('href', '/rooms/3');
  expect(screen.getByText('Green')).toHaveAttribute('href', '/rooms/4');
  expect(screen.getByText('164')).toHaveAttribute('href', '/rooms/5');
});