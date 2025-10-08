import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardClient from '../pages/DashboardClient';
import DashboardCoach from '../pages/DashboardCoach';
import DashboardAdmin from '../pages/DashboardAdmin';
import Onboarding from '../pages/Onboarding';
import Plans from '../pages/Plans';
import Libraries from '../pages/Libraries';
import Chat from '../pages/Chat';
import Tracking from '../pages/Tracking';
import Billing from '../pages/Billing';
import Settings from '../pages/Settings';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ProtectedRoute({ roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    // unauthorized role - send to their dashboard
    const redirect = user.role === 'admin' ? '/admin' : user.role === 'coach' ? '/coach' : '/client';
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
}

function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Role landing dashboards */}
          <Route path="/" element={<Navigate to="/client" replace />} />
          <Route path="/client" element={<DashboardClient />} />
          <Route path="/coach" element={<DashboardCoach />} />
          <Route path="/admin" element={<DashboardAdmin />} />

          {/* General protected routes */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Role guards examples */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin-only" element={<DashboardAdmin />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
