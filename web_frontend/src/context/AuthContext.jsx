import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { api } from '../services/api';

const useSupabase = process.env.REACT_APP_USE_SUPABASE_AUTH === 'true';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
const supabase = useSupabase && supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('nc_user');
    return raw ? JSON.parse(raw) : null;
  });

  const saveUser = useCallback((u) => {
    setUser(u);
    if (u) localStorage.setItem('nc_user', JSON.stringify(u));
    else localStorage.removeItem('nc_user');
  }, []);

  // PUBLIC_INTERFACE
  const login = useCallback(async (email, password) => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const profile = { email: data.user.email, role: 'client', provider: 'supabase' };
      saveUser(profile);
      return profile;
    } else {
      // Backend JWT style
      const res = await api.post('/auth/login/', { email, password });
      const { token, role } = res.data || {};
      if (token) localStorage.setItem('nc_token', token);
      const profile = { email, role: role || 'client', provider: 'jwt' };
      saveUser(profile);
      return profile;
    }
  }, [saveUser]);

  // PUBLIC_INTERFACE
  const register = useCallback(async (email, password) => {
    if (useSupabase && supabase) {
      const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: siteUrl }
      });
      if (error) throw error;
      return data;
    } else {
      const res = await api.post('/auth/register/', { email, password });
      return res.data;
    }
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(async () => {
    if (useSupabase && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('nc_token');
    saveUser(null);
  }, [saveUser]);

  useEffect(() => {
    if (useSupabase && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          saveUser(null);
        } else {
          const u = session.user;
          saveUser({ email: u.email, role: 'client', provider: 'supabase' });
        }
      });
      return () => authListener.subscription.unsubscribe();
    }
  }, [saveUser]);

  const value = useMemo(() => ({
    user,
    login,
    logout,
    register
  }), [user, login, logout, register]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
