import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, hydrating } = useAuth();

  if (hydrating) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--app-bg)', color: 'var(--app-text)' }}>Loading session…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
}
