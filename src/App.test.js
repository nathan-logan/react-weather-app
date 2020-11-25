import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const element = screen.getByText(/Please enter a city/i);
  expect(element).toBeInTheDocument();
});
