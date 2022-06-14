import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import RoomDetails from './RoomDetails'

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/rooms/1']}>
      <RoomDetails />
    </MemoryRouter>
  );
}

test('renders RoomDetails component successfully', () => {
  setup();
});

test('renders on /rooms/1 route with all pertinent room details shown', () => {
  setup();
  expect(screen.getByText(/Building/i)).toBeInTheDocument();
  expect(screen.getByText(/Room: Orange/i)).toBeInTheDocument();
  expect(screen.getByText(/Capacity/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByText(/Orange/i)).toBeInTheDocument();
  expect(screen.getByText(/8175/i)).toBeInTheDocument();
  expect(screen.getByText(/24/i)).toBeInTheDocument();
});