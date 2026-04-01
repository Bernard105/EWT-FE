import { ROUTES } from '../routes';
import { apiRequest, createApiPath } from '../lib/api/httpClient';
import { demoApi } from '../lib/demoApi';
import { isPreviewModeEnabled } from '../lib/previewMode';

export const authService = {
  async getOAuthProviders() {
    if (isPreviewModeEnabled()) return demoApi.getOAuthProviders();
    return apiRequest('/api/oauth/providers', {
      method: 'GET',
      authenticated: false,
    });
  },

  getOAuthStartUrl(provider, returnPath = ROUTES.oauthCallback) {
    const params = new URLSearchParams({
      frontend_origin: typeof window !== 'undefined' ? window.location.origin : '',
      return_path: returnPath,
    });
    return createApiPath(`/api/oauth/${provider}/start?${params.toString()}`);
  },

  async register(payload) {
    if (isPreviewModeEnabled()) return demoApi.register(payload);
    return apiRequest('/api/register', {
      method: 'POST',
      body: payload,
      authenticated: false,
    });
  },

  async login(payload) {
    if (isPreviewModeEnabled()) {
      const response = await demoApi.login(payload);
      return { token: response.session_token, user: response.user, raw: response };
    }
    const response = await apiRequest('/api/login', {
      method: 'POST',
      body: payload,
      authenticated: false,
    });

    return {
      token: response.session_token || response.access_token,
      user: response.user,
      raw: response,
    };
  },

  async forgotPassword(payload) {
    if (isPreviewModeEnabled()) return demoApi.forgotPassword(payload);
    return apiRequest('/api/forgot-password', {
      method: 'POST',
      body: payload,
      authenticated: false,
    });
  },

  async resetPassword(payload) {
    if (isPreviewModeEnabled()) return demoApi.resetPassword(payload);
    return apiRequest('/api/reset-password', {
      method: 'POST',
      body: {
        token: payload.token,
        new_password: payload.newPassword || payload.new_password,
      },
      authenticated: false,
    });
  },

  async logout() {
    if (isPreviewModeEnabled()) return demoApi.logout();
    return apiRequest('/api/logout', { method: 'POST' });
  },

  async getProfile() {
    if (isPreviewModeEnabled()) return demoApi.getProfile();
    return apiRequest('/api/profile', { method: 'GET' });
  },

  async getProfileSummary() {
    if (isPreviewModeEnabled()) return demoApi.getProfileSummary();
    return apiRequest('/api/profile/summary', { method: 'GET' });
  },

  async updateProfile(payload) {
    if (isPreviewModeEnabled()) return demoApi.updateProfile(payload);
    return apiRequest('/api/profile', {
      method: 'PUT',
      body: payload,
    });
  },

  async changePassword(payload) {
    if (isPreviewModeEnabled()) return demoApi.changePassword(payload);
    return apiRequest('/api/change-password', {
      method: 'POST',
      body: payload,
    });
  },
};
