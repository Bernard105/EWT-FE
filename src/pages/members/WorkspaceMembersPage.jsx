import React, { useEffect, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { workspaceService } from '../../services';
import '../../styles/members/WorkspaceMembersPage.css';

export default function WorkspaceMembersPage() {
  const { user } = useAuth();
  const { activeWorkspace, activeWorkspaceId, refreshWorkspaces } = useWorkspace();
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState('');

  const isOwner = activeWorkspace?.role === 'owner';

  const loadMembers = async () => {
    if (!activeWorkspaceId) return;
    try {
      const response = await workspaceService.listMembers(activeWorkspaceId);
      setMembers(response.members || []);
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Unable to load members');
    }
  };

  useEffect(() => { loadMembers(); }, [activeWorkspaceId]);

  const handleRoleChange = async (memberId, role) => {
    setBusy(`role-${memberId}`);
    try {
      await workspaceService.updateMemberRole(activeWorkspaceId, memberId, role);
      await loadMembers();
      await refreshWorkspaces();
      setMessage('Member role updated.');
    } catch (error) {
      setMessage(error.message || 'Unable to update member role');
    } finally {
      setBusy('');
    }
  };

  const handleRemove = async (memberId) => {
    if (!window.confirm('Remove this member from the workspace?')) return;
    setBusy(`remove-${memberId}`);
    try {
      await workspaceService.removeMember(activeWorkspaceId, memberId);
      await loadMembers();
      setMessage('Member removed.');
    } catch (error) {
      setMessage(error.message || 'Unable to remove member');
    } finally {
      setBusy('');
    }
  };

  const handleTransfer = async (memberId) => {
    if (!window.confirm('Transfer ownership to this member?')) return;
    setBusy(`transfer-${memberId}`);
    try {
      await workspaceService.transferOwnership(activeWorkspaceId, memberId);
      await loadMembers();
      await refreshWorkspaces();
      setMessage('Ownership transferred.');
    } catch (error) {
      setMessage(error.message || 'Unable to transfer ownership');
    } finally {
      setBusy('');
    }
  };

  if (!activeWorkspace) {
    return <AppShell title="Members" subtitle="Select a workspace first."><div className="members-empty">Choose a workspace to manage members.</div></AppShell>;
  }

  return (
    <AppShell title="Members" subtitle={`Manage roles for ${activeWorkspace.name}. Owner-only actions are enabled only when the backend allows them.`}>
      {message ? <div className="members-message">{message}</div> : null}
      <section className="members-list">
        {members.map((member) => {
          const self = member.id === user?.id;
          const owner = member.role === 'owner';
          return (
            <article className="member-card" key={member.id}>
              <div>
                <strong>{member.name}</strong>
                <p>{member.email}</p>
                <small>Joined {new Date(member.joined_at).toLocaleDateString()}</small>
              </div>
              <div className="member-actions">
                <span className="member-role">{member.role}</span>
                {isOwner && !owner ? (
                  <select value={member.role} disabled={busy === `role-${member.id}`} onChange={(event) => handleRoleChange(member.id, event.target.value)}>
                    <option value="member">member</option>
                    <option value="admin">admin</option>
                  </select>
                ) : null}
                {isOwner && !self && !owner ? <button type="button" className="member-btn" onClick={() => handleTransfer(member.id)} disabled={busy === `transfer-${member.id}`}>Make owner</button> : null}
                {isOwner && !self && !owner ? <button type="button" className="member-btn danger" onClick={() => handleRemove(member.id)} disabled={busy === `remove-${member.id}`}>Remove</button> : null}
              </div>
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
