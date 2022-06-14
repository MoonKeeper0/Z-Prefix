import { render, screen } from '@testing-library/react';

import CalendarCard from './CalendarCard';

const setup = () => {
  render(
    <CalendarCard classtitle="OEW 101" room="101A" faculty="Capt Huf" />
  );
}

test('renders CalendarCard component successfully', () => {
  setup();
});

test('renders with correct text', () => {
  setup();
  expect(screen.getByText(/OEW 101/i)).toBeInTheDocument();
  expect(screen.getByText(/101A/i)).toBeInTheDocument();
  expect(screen.getByText(/Capt Huf/i)).toBeInTheDocument();
});