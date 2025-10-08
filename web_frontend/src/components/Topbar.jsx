import React from 'react';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-title">Dashboard</div>
      <div className="topbar-actions">
        {user ? (
          <>
            <span className="user-pill">{user.email} • {user.role}</span>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
          </>
        ) : (
          <span className="user-pill">Guest</span>
        )}
      </div>
    </header>
  );
}
