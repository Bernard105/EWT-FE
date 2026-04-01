import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../components/app/AppShell';
import { ROUTES } from '../routes';
import { useWorkspace } from '../context/WorkspaceContext';
import { workspaceService } from '../services';
import '../styles/workspace-selector.css';

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

export default function WorkspaceSelectorPage() {
  const navigate = useNavigate();
  const {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    setActiveWorkspaceId,
    createWorkspace,
    refreshWorkspaces,
    loading,
    error,
  } = useWorkspace();
  const [pending, setPending] = useState([]);
  const [busy, setBusy] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    name: '',
    domain_namespace: '',
    industry_vertical: 'Technology & SaaS',
    workspace_logo_data: '',
  });

  const canContinue = useMemo(() => Boolean(activeWorkspaceId || workspaces[0]?.id), [activeWorkspaceId, workspaces]);

  useEffect(() => {
    workspaceService.listPendingInvitations().then((response) => {
      setPending(response.invitations || []);
    }).catch(() => setPending([]));
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setBusy('create');
    setNotice('');
    try {
      const created = await createWorkspace({
        name: form.name,
        domain_namespace: form.domain_namespace || null,
        industry_vertical: form.industry_vertical || null,
        workspace_logo_data: form.workspace_logo_data || null,
      });
      setForm({ name: '', domain_namespace: '', industry_vertical: 'Technology & SaaS', workspace_logo_data: '' });
      setNotice(`Workspace “${created.name}” created successfully.`);
      navigate(ROUTES.dashboard);
    } catch (error) {
      setNotice(error.message || 'Unable to create workspace');
    } finally {
      setBusy('');
    }
  };

  const handleAccept = async (code) => {
    setBusy(`accept-${code}`);
    setNotice('');
    try {
      const response = await workspaceService.acceptInvitation(code);
      await refreshWorkspaces();
      setActiveWorkspaceId(response.workspace_id);
      setPending((current) => current.filter((item) => item.code !== code));
      setNotice(`Joined ${response.workspace_name} as ${response.role}.`);
    } catch (error) {
      setNotice(error.message || 'Unable to accept invitation');
    } finally {
      setBusy('');
    }
  };

  const handleDecline = async (invitationId) => {
    setBusy(`decline-${invitationId}`);
    setNotice('');
    try {
      await workspaceService.declineInvitation(invitationId);
      setPending((current) => current.filter((item) => item.id !== invitationId));
      setNotice('Invitation declined.');
    } catch (error) {
      setNotice(error.message || 'Unable to decline invitation');
    } finally {
      setBusy('');
    }
  };

  return (
    <AppShell
      title="Workspace selector"
      subtitle="Choose the workspace you want to work in, or create a new one that matches the backend contract exactly."
      actions={canContinue ? <Link className="ws-primary-link" to={ROUTES.dashboard}>Open workspace</Link> : null}
    >
      <div className="ws-grid-layout">
        <section className="ws-panel">
          <div className="ws-panel-head">
            <h2>Your workspaces</h2>
            <span>{loading ? 'Loading…' : `${workspaces.length} workspace(s)`}</span>
          </div>
          <p className="ws-feedback">{notice || error || 'Select one workspace to unlock dashboard, tasks, invitations and setup.'}</p>
          <div className="ws-card-grid">
            {workspaces.map((workspace) => (
              <button
                type="button"
                key={workspace.id}
                className={`ws-card ${workspace.id === activeWorkspaceId ? 'selected' : ''}`}
                onClick={() => setActiveWorkspaceId(workspace.id)}
              >
                <div className="ws-card-top">
                  <strong>{workspace.name}</strong>
                  <span className="ws-role-pill">{workspace.role}</span>
                </div>
                <p>{workspace.industry_vertical || 'No industry selected yet.'}</p>
                <div className="ws-card-meta">
                  <span>@{workspace.domain_namespace || 'auto-generated'}</span>
                  {workspace.workspace_logo_data ? <span>Logo configured</span> : <span>No logo</span>}
                </div>
              </button>
            ))}
            {!workspaces.length ? <div className="ws-empty">No workspaces yet. Create one to continue.</div> : null}
          </div>
          {activeWorkspace ? (
            <div className="ws-selected-actions">
              <Link className="ws-primary-link" to={ROUTES.dashboard}>Go to dashboard</Link>
              <Link className="ws-secondary-link" to={ROUTES.tasks}>Open task board</Link>
            </div>
          ) : null}
        </section>

        <section className="ws-panel">
          <div className="ws-panel-head">
            <h2>Create workspace</h2>
            <span>POST /api/workspaces</span>
          </div>
          <form className="ws-form" onSubmit={handleCreate}>
            <label>
              <span>Workspace name</span>
              <input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="EasyWork Core Team" />
            </label>
            <label>
              <span>Domain namespace</span>
              <input value={form.domain_namespace} onChange={(event) => setForm((current) => ({ ...current, domain_namespace: event.target.value }))} placeholder="easywork-core" />
            </label>
            <label>
              <span>Industry vertical</span>
              <select value={form.industry_vertical} onChange={(event) => setForm((current) => ({ ...current, industry_vertical: event.target.value }))}>
                {INDUSTRIES.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
              </select>
            </label>
            <label>
              <span>Logo data URL (optional)</span>
              <textarea value={form.workspace_logo_data} onChange={(event) => setForm((current) => ({ ...current, workspace_logo_data: event.target.value }))} placeholder="data:image/png;base64,..." rows={4} />
            </label>
            <button className="ws-primary-link" type="submit" disabled={busy === 'create'}>{busy === 'create' ? 'Creating…' : 'Create workspace'}</button>
          </form>
        </section>
      </div>

      <section className="ws-panel ws-invitations-panel">
        <div className="ws-panel-head">
          <h2>Pending invitations</h2>
          <span>GET /api/invitations/pending</span>
        </div>
        <div className="ws-invitation-list">
          {pending.map((item) => (
            <article className="ws-invitation-card" key={item.id}>
              <div>
                <strong>{item.workspace_name}</strong>
                <p>Invited by {item.inviter.name} • role: {item.role}</p>
                <small>Code: {item.code}</small>
              </div>
              <div className="ws-inline-actions">
                <button type="button" className="ws-primary-link" onClick={() => handleAccept(item.code)} disabled={busy === `accept-${item.code}`}>Accept</button>
                <button type="button" className="ws-secondary-link" onClick={() => handleDecline(item.id)} disabled={busy === `decline-${item.id}`}>Decline</button>
              </div>
            </article>
          ))}
          {!pending.length ? <div className="ws-empty">You have no pending invitations.</div> : null}
        </div>
      </section>
    </AppShell>
  );
}
