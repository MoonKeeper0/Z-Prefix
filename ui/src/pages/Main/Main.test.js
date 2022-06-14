import { render, screen } from '@testing-library/react';
import {MemoryRouter, MemoryRouter as Router} from 'react-router'; 

import Main from './Main';

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Main />
    </MemoryRouter>
  );
}

test('renders Main component successfully', () => {
  setup();
});

test('renders on root route with weekday headers and a search', () => {
  setup();
  expect(screen.getByText(/monday/i)).toBeInTheDocument();
  expect(screen.getByText(/tuesday/i)).toBeInTheDocument();
  expect(screen.getByText(/wednesday/i)).toBeInTheDocument();
  expect(screen.getByText(/thursday/i)).toBeInTheDocument();
  //expect(screen.getByText(/friday/i)).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
});

test('renders links for classes, faculty, rooms, and students at the bottom of the page', () => {
  setup();
  expect(screen.getByText('Faculty List')).toBeInTheDocument();
  expect(screen.getByText('Faculty List')).toHaveAttribute('href', '/faculty');
  expect(screen.getByText('Class List')).toBeInTheDocument();
  expect(screen.getByText('Class List')).toHaveAttribute('href', '/classes');
  expect(screen.getByText('Room List')).toBeInTheDocument();
  expect(screen.getByText('Room List')).toHaveAttribute('href', '/rooms');
  expect(screen.getByText('Student List')).toBeInTheDocument();
  expect(screen.getByText('Student List')).toHaveAttribute('href', '/students');
});
