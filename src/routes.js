export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  tasks: '/tasks',
  analytics: '/analytics',
  members: '/members',
  invitations: '/invitations',
  workspaceSelector: '/workspaces',
  workspaceSetup: '/profile',
  workspaceSetupLegacy: '/setup',
  workspaceInvitations: '/analytics',
  workspaceMembers: '/members',
  register: '/register',
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  oauthCallback: '/oauth/callback',
};

export const WORKSPACE_TOP_NAV = [
  { label: 'Dashboard', to: ROUTES.dashboard, end: true },
  { label: 'Tasks', to: ROUTES.tasks },
  { label: 'Analytics', to: ROUTES.analytics },
  { label: 'Members', to: ROUTES.members },
  { label: 'Profile', to: ROUTES.workspaceSetup },
];
