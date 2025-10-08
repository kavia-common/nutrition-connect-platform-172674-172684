import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access authenticated user and auth actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
