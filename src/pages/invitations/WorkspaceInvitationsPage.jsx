import React, { useEffect, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useWorkspace } from '../../context/WorkspaceContext';
import { workspaceService } from '../../services';
import '../../styles/invitations/WorkspaceInvitationsPage.css';

export default function WorkspaceInvitationsPage() {
  const { activeWorkspace, activeWorkspaceId, refreshWorkspaces } = useWorkspace();
  const [pendingForMe, setPendingForMe] = useState([]);
  const [workspaceInvitations, setWorkspaceInvitations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState({ email: '', role: 'member' });
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState('');

  const isOwner = activeWorkspace?.role === 'owner';

  const loadData = async () => {
    try {
      const [pendingResponse, suggestionResponse] = await Promise.all([
        workspaceService.listPendingInvitations(),
        workspaceService.listInviteSuggestions(activeWorkspaceId),
      ]);
      setPendingForMe(pendingResponse.invitations || []);
      setSuggestions(suggestionResponse.suggestions || []);
      if (activeWorkspaceId && isOwner) {
        const invitationResponse = await workspaceService.listWorkspaceInvitations(activeWorkspaceId);
        setWorkspaceInvitations(invitationResponse.invitations || []);
      } else {
        setWorkspaceInvitations([]);
      }
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Unable to load invitations');
    }
  };

  useEffect(() => { loadData(); }, [activeWorkspaceId, isOwner]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!activeWorkspaceId) return;
    setBusy('create');
    try {
      const response = await workspaceService.createInvitation(activeWorkspaceId, form);
      setMessage(`Invitation created. Code: ${response.code}`);
      setForm({ email: '', role: 'member' });
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Unable to create invitation');
    } finally {
      setBusy('');
    }
  };

  const handleAccept = async (code) => {
    setBusy(`accept-${code}`);
    try {
      const response = await workspaceService.acceptInvitation(code);
      await refreshWorkspaces();
      setMessage(`Joined ${response.workspace_name}.`);
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Unable to accept invitation');
    } finally {
      setBusy('');
    }
  };

  const handleDecline = async (id) => {
    setBusy(`decline-${id}`);
    try {
      await workspaceService.declineInvitation(id);
      setMessage('Invitation declined.');
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Unable to decline invitation');
    } finally {
      setBusy('');
    }
  };

  const handleResend = async (id) => {
    setBusy(`resend-${id}`);
    try {
      await workspaceService.resendInvitation(activeWorkspaceId, id);
      setMessage('Invitation resent.');
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Unable to resend invitation');
    } finally {
      setBusy('');
    }
  };

  const handleRevoke = async (id) => {
    setBusy(`revoke-${id}`);
    try {
      await workspaceService.revokeInvitation(activeWorkspaceId, id);
      setMessage('Invitation revoked.');
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Unable to revoke invitation');
    } finally {
      setBusy('');
    }
  };

  return (
    <AppShell title="Invitations" subtitle="Accept pending invitations for yourself and manage workspace invitations if you are the owner.">
      {message ? <div className="invite-message">{message}</div> : null}
      <div className="invite-grid">
        <section className="invite-panel">
          <div className="invite-panel-head"><h2>Invitations for me</h2><span>{pendingForMe.length}</span></div>
          <div className="invite-list">
            {pendingForMe.map((invite) => (
              <article className="invite-card" key={invite.id}>
                <div>
                  <strong>{invite.workspace_name}</strong>
                  <p>Role: {invite.role} • From {invite.inviter.name}</p>
                  <small>Code {invite.code}</small>
                </div>
                <div className="invite-actions">
                  <button type="button" className="invite-primary" onClick={() => handleAccept(invite.code)} disabled={busy === `accept-${invite.code}`}>Accept</button>
                  <button type="button" className="invite-secondary" onClick={() => handleDecline(invite.id)} disabled={busy === `decline-${invite.id}`}>Decline</button>
                </div>
              </article>
            ))}
            {!pendingForMe.length ? <div className="invite-empty">No pending invitations for your account.</div> : null}
          </div>
        </section>

        <section className="invite-panel">
          <div className="invite-panel-head"><h2>Create invitation</h2><span>{isOwner ? 'Owner only' : 'Read only'}</span></div>
          {isOwner && activeWorkspaceId ? (
            <form className="invite-form" onSubmit={handleCreate}>
              <label><span>Email</span><input required value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="member@company.com" /></label>
              <label><span>Role</span><select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}><option value="member">member</option><option value="admin">admin</option><option value="Team Member">Team Member</option></select></label>
              <button className="invite-primary" type="submit" disabled={busy === 'create'}>{busy === 'create' ? 'Sending…' : 'Send invitation'}</button>
            </form>
          ) : <div className="invite-empty">Only workspace owners can create invitations.</div>}

          <div className="invite-suggestion-box">
            <h3>Invite suggestions</h3>
            {suggestions.slice(0, 5).map((item) => (
              <button key={`${item.email}-${item.reason}`} type="button" className="invite-suggestion" onClick={() => setForm((current) => ({ ...current, email: item.email }))}>
                <strong>{item.name || item.email}</strong>
                <span>{item.reason} • {item.interaction_count}</span>
              </button>
            ))}
            {!suggestions.length ? <div className="invite-empty">No suggestions yet.</div> : null}
          </div>
        </section>
      </div>

      <section className="invite-panel full">
        <div className="invite-panel-head"><h2>Workspace invitations</h2><span>{workspaceInvitations.length}</span></div>
        {isOwner ? (
          <div className="invite-list">
            {workspaceInvitations.map((invite) => (
              <article className="invite-card" key={invite.id}>
                <div>
                  <strong>{invite.invitee_name || invite.invitee_email}</strong>
                  <p>{invite.role} • {invite.status}</p>
                  <small>Code {invite.code}</small>
                </div>
                <div className="invite-actions">
                  {invite.status === 'pending' ? <button type="button" className="invite-secondary" onClick={() => handleResend(invite.id)} disabled={busy === `resend-${invite.id}`}>Resend</button> : null}
                  {invite.status === 'pending' ? <button type="button" className="invite-secondary danger" onClick={() => handleRevoke(invite.id)} disabled={busy === `revoke-${invite.id}`}>Revoke</button> : null}
                </div>
              </article>
            ))}
            {!workspaceInvitations.length ? <div className="invite-empty">No invitations created for this workspace yet.</div> : null}
          </div>
        ) : <div className="invite-empty">Workspace invitation management is owner-only.</div>}
      </section>
    </AppShell>
  );
}
