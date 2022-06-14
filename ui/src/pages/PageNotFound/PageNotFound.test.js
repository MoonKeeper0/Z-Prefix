import { render, screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';

test('renders learn react link', () => {
  render(<PageNotFound />);
  const linkElement = screen.getByText(/PageNotFound 404/i);
  expect(linkElement).toBeInTheDocument();
});