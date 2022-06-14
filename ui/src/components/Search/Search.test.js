import { render, screen } from '@testing-library/react';
import Search from './Search';

const setup = () => {
  render(
      <Search />
  );
}

test('renders Search component successfully', () => {
  setup();
});

test('renders a search field', () => {
  setup();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
});