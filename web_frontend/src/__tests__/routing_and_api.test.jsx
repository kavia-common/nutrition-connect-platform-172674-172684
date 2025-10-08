import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../routes/Router';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ status: 'ok' })
  })
);

function renderWithAuth(ui, { user } = {}) {
  const value = { user, login: jest.fn(), logout: jest.fn(), register: jest.fn() };
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/client']}>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );
}

test('unauthenticated user is redirected to login for protected route', () => {
  renderWithAuth(<Router />, { user: null });
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});

test('authenticated user sees dashboard', () => {
  renderWithAuth(<Router />, { user: { email: 'a@b.com', role: 'client' } });
  expect(screen.getByText(/Client Overview/i)).toBeInTheDocument();
});

test('api client performs health check', async () => {
  const res = await api.health();
  expect(res.ok).toBe(true);
  expect(res.data.status).toBe('ok');
});
