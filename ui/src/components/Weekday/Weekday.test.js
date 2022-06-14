import { render, screen } from '@testing-library/react';

import Weekday from './Weekday';

const setup = () => {
  render(
    <Weekday title="Monday" />
  );
}

test('renders Weekday component successfully', () => {
  setup();
});

test('renders with a weekday header (testing with Monday)', () => {
  setup();
  expect(screen.getByText(/monday/i)).toBeInTheDocument();
});

test('renders with two shifts (AM and PM)', () => {
  setup();
  expect(screen.getByText(/am/i)).toBeInTheDocument();
  expect(screen.getByText(/pm/i)).toBeInTheDocument();
});