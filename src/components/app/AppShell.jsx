import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES, WORKSPACE_TOP_NAV } from '../../routes';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { usePreviewMode } from '../../context/PreviewModeContext';
import ThemeSwitch from '../theme/ThemeSwitch';
import './AppShell.css';

const navItems = [
  ...WORKSPACE_TOP_NAV,
  { label: 'Invitations', to: ROUTES.invitations },
  { label: 'Workspaces', to: ROUTES.workspaceSelector },
];

export default function AppShell({ title, subtitle, actions, children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { activeWorkspaceId, setActiveWorkspaceId, workspaces } = useWorkspace();
  const { theme } = useTheme();
  const { previewMode, isApiConfigured } = usePreviewMode();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className={`suite-app theme-${theme}`}>
      <aside className="suite-sidebar">
        <Link to={ROUTES.home} className="suite-branding">
          <span className="suite-brand-primary">EasyWork</span>
          <span className="suite-brand-accent">Together</span>
        </Link>

        <nav className="suite-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `suite-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="suite-sidebar-footer">
          <div className="suite-sidebar-note">{previewMode ? 'Preview mode with local demo data' : (isApiConfigured ? 'Connected to backend API' : 'Live API selected but backend URL is not configured')}</div>
          <button type="button" className="suite-ghost-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>

      <div className="suite-main">
        <header className="suite-topbar">
          <div>
            <div className="suite-kicker">WORKSPACE APP</div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>

          <div className="suite-topbar-actions">
            {workspaces.length ? (
              <label className="suite-select-shell">
                <span>Workspace</span>
                <select
                  value={activeWorkspaceId || ''}
                  onChange={(event) => setActiveWorkspaceId(Number(event.target.value) || null)}
                >
                  {workspaces.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <ThemeSwitch label="Theme" />
            {actions}
            <div className="suite-user-chip">
              <span>{user?.name || 'Workspace User'}</span>
              <small>{user?.email || ''}</small>
            </div>
          </div>
        </header>

        <main className="suite-page-body">{children}</main>
      </div>
    </div>
  );
}
