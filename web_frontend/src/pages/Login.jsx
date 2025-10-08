import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { track } from '../utils/analytics';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form supporting Supabase or backend JWT depending on env settings. */
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const profile = await login(email, password);
      track('login_success', { provider: profile.provider });
      const path = profile.role === 'admin' ? '/admin' : profile.role === 'coach' ? '/coach' : '/client';
      navigate(path, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
      track('login_error', { message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <Card title="Welcome back">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="••••••••" />
          </div>
          {error && <div className="error-text">{error}</div>}
          <Button disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          New here? <Link to="/register">Create an account</Link>
        </div>
      </Card>
    </div>
  );
}
