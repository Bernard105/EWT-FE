import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import EnterpriseLandingPage from './pages/EnterpriseLandingPage';
import DashboardOverviewPage from './pages/dashboard/DashboardOverviewPage';
import TaskManagementPage from './pages/task/TaskManagementPage';
import WorkspaceSelectorPage from './pages/WorkspaceSelectorPage';
import WorkspaceMembersPage from './pages/members/WorkspaceMembersPage';
import WorkspaceInvitationsPage from './pages/invitations/WorkspaceInvitationsPage';
import WorkspaceSetupPage from './pages/setup/WorkspaceSetupPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import {
  ForgotPasswordPage,
  LoginPage,
  OAuthCallbackPage,
  RegisterPage,
  ResetPasswordPage,
} from './pages/auth/AuthPages';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PreviewModeProvider } from './context/PreviewModeContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import PreviewModeToggle from './components/preview/PreviewModeToggle';

export default function App() {
  return (
    <ThemeProvider>
      <PreviewModeProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <Routes>
            <Route path={ROUTES.home} element={<EnterpriseLandingPage />} />

            <Route path={ROUTES.dashboard} element={<ProtectedRoute><DashboardOverviewPage /></ProtectedRoute>} />
            <Route path={ROUTES.tasks} element={<ProtectedRoute><TaskManagementPage /></ProtectedRoute>} />
            <Route path={ROUTES.analytics} element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path={ROUTES.members} element={<ProtectedRoute><WorkspaceMembersPage /></ProtectedRoute>} />
            <Route path={ROUTES.invitations} element={<ProtectedRoute><WorkspaceInvitationsPage /></ProtectedRoute>} />
            <Route path={ROUTES.workspaceSelector} element={<ProtectedRoute><WorkspaceSelectorPage /></ProtectedRoute>} />
            <Route path={ROUTES.workspaceSetup} element={<ProtectedRoute><WorkspaceSetupPage /></ProtectedRoute>} />
            <Route path={ROUTES.workspaceSetupLegacy} element={<ProtectedRoute><WorkspaceSetupPage /></ProtectedRoute>} />

            <Route path={ROUTES.register} element={<GuestRoute><RegisterPage /></GuestRoute>} />
            <Route path={ROUTES.login} element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path={ROUTES.forgotPassword} element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
            <Route path={ROUTES.resetPassword} element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />
            <Route path={ROUTES.oauthCallback} element={<OAuthCallbackPage />} />
              <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
            </Routes>
            <PreviewModeToggle />
          </WorkspaceProvider>
        </AuthProvider>
      </PreviewModeProvider>
    </ThemeProvider>
  );
}
