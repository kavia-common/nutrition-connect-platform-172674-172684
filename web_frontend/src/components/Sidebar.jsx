import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Sidebar() {
  const items = [
    { to: '/client', label: 'Client' },
    { to: '/coach', label: 'Coach' },
    { to: '/admin', label: 'Admin' },
    { to: '/plans', label: 'Plans' },
    { to: '/libraries', label: 'Libraries' },
    { to: '/chat', label: 'Chat' },
    { to: '/tracking', label: 'Tracking' },
    { to: '/billing', label: 'Billing' },
    { to: '/settings', label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Nutrition Connect</div>
      <nav className="sidebar-nav">
        {items.map(i => (
          <NavLink key={i.to} to={i.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
