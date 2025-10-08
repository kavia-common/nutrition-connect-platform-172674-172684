import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app root without crashing', () => {
  render(<App />);
  // Theme toggle is present
  const toggle = screen.getByRole('button');
  expect(toggle).toBeInTheDocument();
});
