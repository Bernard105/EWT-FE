import { apiRequest } from '../lib/api/httpClient';
import { demoApi } from '../lib/demoApi';
import { isPreviewModeEnabled } from '../lib/previewMode';

function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });
  const encoded = query.toString();
  return encoded ? `?${encoded}` : '';
}

export const taskService = {
  async listTasks(workspaceId, params = {}) {
    if (isPreviewModeEnabled()) return demoApi.listTasks(workspaceId, params);
    return apiRequest(`/api/workspaces/${workspaceId}/tasks${buildQuery(params)}`, {
      method: 'GET',
    });
  },

  async createTask(workspaceId, payload) {
    if (isPreviewModeEnabled()) return demoApi.createTask(workspaceId, payload);
    return apiRequest(`/api/workspaces/${workspaceId}/tasks`, {
      method: 'POST',
      body: payload,
    });
  },

  async getTask(taskId) {
    if (isPreviewModeEnabled()) return demoApi.getTask(taskId);
    return apiRequest(`/api/tasks/${taskId}`, { method: 'GET' });
  },

  async updateTask(taskId, payload) {
    if (isPreviewModeEnabled()) return demoApi.updateTask(taskId, payload);
    return apiRequest(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: payload,
    });
  },

  async voteStoryPoints(taskId, points) {
    if (isPreviewModeEnabled()) return demoApi.voteStoryPoints(taskId, points);
    return apiRequest(`/api/tasks/${taskId}/story-point-votes`, {
      method: 'POST',
      body: { points },
    });
  },

  async deleteTask(taskId) {
    if (isPreviewModeEnabled()) return demoApi.deleteTask(taskId);
    return apiRequest(`/api/tasks/${taskId}`, { method: 'DELETE' });
  },

  async getWorkspaceStats(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.getWorkspaceStats(workspaceId);
    return apiRequest(`/api/workspaces/${workspaceId}/stats`, { method: 'GET' });
  },

  async getMyStats(workspaceId) {
    if (isPreviewModeEnabled()) return demoApi.getMyStats(workspaceId);
    return apiRequest(`/api/workspaces/${workspaceId}/my-stats`, { method: 'GET' });
  },
};
