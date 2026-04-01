import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_CONFIG } from '../config/appConfig';

export default function GuestRoute({ children }) {
  const { isAuthenticated, hydrating } = useAuth();

  if (hydrating) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--app-bg)', color: 'var(--app-text)' }}>Loading session…</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={APP_CONFIG.defaultAuthedRoute} replace />;
  }

  return children;
}
