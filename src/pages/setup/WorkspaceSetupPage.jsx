import React, { useEffect, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { authService, workspaceService } from '../../services';
import '../../styles/setup/WorkspaceSetupPage.css';

const INDUSTRIES = [
  'Technology & SaaS',
  'Financial Services',
  'Healthcare',
  'Education',
  'Retail & E-commerce',
  'Manufacturing',
  'Professional Services',
  'Other',
];

export default function WorkspaceSetupPage() {
  const { user, refreshProfile, logout } = useAuth();
  const { activeWorkspace, activeWorkspaceId, updateWorkspace, deleteWorkspace, refreshWorkspaces } = useWorkspace();
  const [profileSummary, setProfileSummary] = useState(null);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [workspaceForm, setWorkspaceForm] = useState({ name: '', domain_namespace: '', industry_vertical: '', workspace_logo_data: '' });
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    authService.getProfileSummary().then((response) => setProfileSummary(response)).catch(() => {});
  }, []);

  useEffect(() => {
    setProfileName(user?.name || '');
  }, [user?.name]);

  useEffect(() => {
    if (!activeWorkspace) return;
    setWorkspaceForm({
      name: activeWorkspace.name || '',
      domain_namespace: activeWorkspace.domain_namespace || '',
      industry_vertical: activeWorkspace.industry_vertical || 'Technology & SaaS',
      workspace_logo_data: activeWorkspace.workspace_logo_data || '',
    });
  }, [activeWorkspace]);

  const handleProfileSave = async (event) => {
    event.preventDefault();
    setBusy('profile');
    try {
      await authService.updateProfile({ name: profileName });
      await refreshProfile();
      setMessage('Profile updated.');
    } catch (error) {
      setMessage(error.message || 'Unable to update profile');
    } finally {
      setBusy('');
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setBusy('password');
    try {
      await authService.changePassword({ old_password: passwordForm.oldPassword, new_password: passwordForm.newPassword });
      setPasswordForm({ oldPassword: '', newPassword: '' });
      setMessage('Password changed successfully.');
    } catch (error) {
      setMessage(error.message || 'Unable to change password');
    } finally {
      setBusy('');
    }
  };

  const handleWorkspaceSave = async (event) => {
    event.preventDefault();
    if (!activeWorkspaceId) return;
    setBusy('workspace');
    try {
      await updateWorkspace(activeWorkspaceId, {
        name: workspaceForm.name,
        domain_namespace: workspaceForm.domain_namespace || null,
        industry_vertical: workspaceForm.industry_vertical || null,
        workspace_logo_data: workspaceForm.workspace_logo_data || null,
      });
      await refreshWorkspaces();
      setMessage('Workspace settings updated.');
    } catch (error) {
      setMessage(error.message || 'Unable to update workspace');
    } finally {
      setBusy('');
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!activeWorkspaceId) return;
    if (!window.confirm('Delete this workspace permanently?')) return;
    setBusy('delete-workspace');
    try {
      await deleteWorkspace(activeWorkspaceId);
      setMessage('Workspace deleted.');
    } catch (error) {
      setMessage(error.message || 'Unable to delete workspace');
    } finally {
      setBusy('');
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <AppShell title="Profile" subtitle="Profile and workspace settings mapped to backend profile/workspace endpoints.">
      {message ? <div className="setup-message">{message}</div> : null}
      <div className="setup-grid">
        <section className="setup-panel">
          <div className="setup-panel-head"><h2>Profile summary</h2><span>GET /api/profile/summary</span></div>
          <div className="setup-summary-box">
            <strong>{profileSummary?.user?.name || user?.name || '—'}</strong>
            <p>{profileSummary?.user?.email || user?.email || '—'}</p>
            <small>Avatar label: {profileSummary?.avatar_label || '—'}</small>
            <small>Backend: {profileSummary?.backend?.state || 'unknown'} • {profileSummary?.backend?.api_message || ''}</small>
          </div>
          <form className="setup-form" onSubmit={handleProfileSave}>
            <label><span>Display name</span><input value={profileName} onChange={(event) => setProfileName(event.target.value)} /></label>
            <button className="setup-primary" type="submit" disabled={busy === 'profile'}>{busy === 'profile' ? 'Saving…' : 'Save profile'}</button>
          </form>
        </section>

        <section className="setup-panel">
          <div className="setup-panel-head"><h2>Security</h2><span>POST /api/change-password</span></div>
          <form className="setup-form" onSubmit={handlePasswordChange}>
            <label><span>Current password</span><input type="password" value={passwordForm.oldPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, oldPassword: event.target.value }))} /></label>
            <label><span>New password</span><input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} /></label>
            <button className="setup-primary" type="submit" disabled={busy === 'password'}>{busy === 'password' ? 'Updating…' : 'Change password'}</button>
          </form>
          <button type="button" className="setup-secondary" onClick={handleLogout}>Logout now</button>
        </section>
      </div>

      <section className="setup-panel full-width">
        <div className="setup-panel-head"><h2>Workspace settings</h2><span>{activeWorkspace?.role || 'No workspace selected'}</span></div>
        {activeWorkspace ? (
          <form className="setup-form" onSubmit={handleWorkspaceSave}>
            <div className="setup-grid two-col">
              <label><span>Name</span><input value={workspaceForm.name} onChange={(event) => setWorkspaceForm((current) => ({ ...current, name: event.target.value }))} /></label>
              <label><span>Domain namespace</span><input value={workspaceForm.domain_namespace} onChange={(event) => setWorkspaceForm((current) => ({ ...current, domain_namespace: event.target.value }))} /></label>
              <label><span>Industry</span><select value={workspaceForm.industry_vertical} onChange={(event) => setWorkspaceForm((current) => ({ ...current, industry_vertical: event.target.value }))}>{INDUSTRIES.map((industry) => <option key={industry} value={industry}>{industry}</option>)}</select></label>
              <label><span>Logo data URL</span><input value={workspaceForm.workspace_logo_data} onChange={(event) => setWorkspaceForm((current) => ({ ...current, workspace_logo_data: event.target.value }))} placeholder="data:image/... or /uploads/..." /></label>
            </div>
            <div className="setup-inline-actions">
              <button className="setup-primary" type="submit" disabled={busy === 'workspace'}>{busy === 'workspace' ? 'Saving…' : 'Save workspace'}</button>
              {activeWorkspace.role === 'owner' ? <button className="setup-danger" type="button" onClick={handleDeleteWorkspace} disabled={busy === 'delete-workspace'}>Delete workspace</button> : null}
            </div>
          </form>
        ) : <div className="setup-empty">Select a workspace first.</div>}
      </section>
    </AppShell>
  );
}
