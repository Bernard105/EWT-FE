import { apiRequest } from '../lib/api/httpClient';
import { demoApi } from '../lib/demoApi';
import { isPreviewModeEnabled } from '../lib/previewMode';

export const workspaceService = {
  async listWorkspaces() {
    if (isPreviewModeEnabled()) return demoApi.listWorkspaces();
    return apiRequest('/api/workspaces', { method: 'GET' });
  },

  async createWorkspace(payload) {
    if (isPreviewModeEnabled()) return demoApi.createWorkspace(payload);
    return apiRequest('/api/workspaces', {
      method: 'POST',
      body: payload,
    });
  },

  async updateWorkspace(workspaceId, payload) {
    if (isPreviewModeEnabled()) return demoApi.updateWorkspace(workspaceId, payload);
    return apiRequest(`/api/workspaces/${workspaceId}`, {
      method: 'PUT',
      body: payload,
    });
  },

  async deleteWorkspace(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.deleteWorkspace(workspaceId);
    return apiRequest(`/api/workspaces/${workspaceId}`, {
      method: 'DELETE',
    });
  },

  async listMembers(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.listMembers(workspaceId);
    return apiRequest(`/api/workspaces/${workspaceId}/members`, { method: 'GET' });
  },

  async getMember(workspaceId, memberId) {
    if (isPreviewModeEnabled()) return demoApi.getMember(workspaceId, memberId);
    return apiRequest(`/api/workspaces/${workspaceId}/members/${memberId}`, { method: 'GET' });
  },

  async updateMemberRole(workspaceId, memberId, role) {
    if (isPreviewModeEnabled()) return demoApi.updateMemberRole(workspaceId, memberId, role);
    return apiRequest(`/api/workspaces/${workspaceId}/members/${memberId}`, {
      method: 'PUT',
      body: { role },
    });
  },

  async removeMember(workspaceId, memberId) {
    if (isPreviewModeEnabled()) return demoApi.removeMember(workspaceId, memberId);
    return apiRequest(`/api/workspaces/${workspaceId}/members/${memberId}`, {
      method: 'DELETE',
    });
  },

  async transferOwnership(workspaceId, newOwnerUserId) {
    if (isPreviewModeEnabled()) return demoApi.transferOwnership(workspaceId, newOwnerUserId);
    return apiRequest(`/api/workspaces/${workspaceId}/transfer-ownership`, {
      method: 'POST',
      body: { new_owner_user_id: newOwnerUserId },
    });
  },

  async listWorkspaceInvitations(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.listWorkspaceInvitations(workspaceId);
    return apiRequest(`/api/workspaces/${workspaceId}/invitations`, { method: 'GET' });
  },

  async createInvitation(workspaceId, payload) {
    if (isPreviewModeEnabled()) return demoApi.createInvitation(workspaceId, payload);
    return apiRequest(`/api/workspaces/${workspaceId}/invitations`, {
      method: 'POST',
      body: payload,
    });
  },

  async resendInvitation(workspaceId, invitationId) {
    if (isPreviewModeEnabled()) return demoApi.resendInvitation(workspaceId, invitationId);
    return apiRequest(`/api/workspaces/${workspaceId}/invitations/${invitationId}/resend`, {
      method: 'POST',
    });
  },

  async revokeInvitation(workspaceId, invitationId) {
    if (isPreviewModeEnabled()) return demoApi.revokeInvitation(workspaceId, invitationId);
    return apiRequest(`/api/workspaces/${workspaceId}/invitations/${invitationId}/revoke`, {
      method: 'POST',
    });
  },

  async listPendingInvitations() {
    if (isPreviewModeEnabled()) return demoApi.listPendingInvitations();
    return apiRequest('/api/invitations/pending', { method: 'GET' });
  },

  async getInvitation(invitationId) {
    if (isPreviewModeEnabled()) return demoApi.getInvitation(invitationId);
    return apiRequest(`/api/invitations/${invitationId}`, { method: 'GET' });
  },

  async acceptInvitation(code) {
    if (isPreviewModeEnabled()) return demoApi.acceptInvitation(code);
    return apiRequest('/api/invitations/accept', {
      method: 'POST',
      body: { code },
    });
  },

  async declineInvitation(invitationId) {
    if (isPreviewModeEnabled()) return demoApi.declineInvitation(invitationId);
    return apiRequest(`/api/invitations/${invitationId}/decline`, {
      method: 'POST',
    });
  },

  async listInviteSuggestions(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.listInviteSuggestions(workspaceId);
    const path = workspaceId
      ? `/api/workspaces/${workspaceId}/invitations/suggestions`
      : '/api/workspaces/invite-suggestions';
    return apiRequest(path, { method: 'GET' });
  },
};
