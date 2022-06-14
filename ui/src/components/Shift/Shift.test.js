import { render, screen } from '@testing-library/react';

import Shift from './Shift';

const setup = () => {
  render(
    <Shift title="AM" />
  );
}

test('renders Shift component successfully', () => {
  setup();
});

test('renders with a shift header (testing with AM)', () => {
  setup();
  expect(screen.getByText(/am/i)).toBeInTheDocument();
});