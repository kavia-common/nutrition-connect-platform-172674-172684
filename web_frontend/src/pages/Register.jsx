import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { track } from '../utils/analytics';

// PUBLIC_INTERFACE
export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setStatus('');
    try {
      await register(email, password);
      setStatus('Registration successful. Please check your email to confirm.');
      track('register_success', { email });
    } catch (err) {
      setError(err.message || 'Registration failed');
      track('register_error', { message: err.message });
    }
  }

  return (
    <div className="auth-page">
      <Card title="Create your account">
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
          {status && <div className="success-text">{status}</div>}
          <Button>Sign up</Button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
