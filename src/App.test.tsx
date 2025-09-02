import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/User Management/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search by name or email/i);
  expect(searchInput).toBeInTheDocument();
});