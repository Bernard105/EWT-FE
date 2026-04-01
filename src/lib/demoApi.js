const DEMO_STATE_KEY = 'ewt_demo_state_v1';
const DEMO_SESSION_KEY = 'ewt_demo_session_v1';

const DEMO_USER = {
  id: 1,
  name: 'Alex Chen',
  email: 'alex@easywork.local',
};

function createDefaultState() {
  return {
    users: [
      DEMO_USER,
      { id: 2, name: 'Sarah Chen', email: 'sarah@easywork.local' },
      { id: 3, name: 'Mike Ross', email: 'mike@easywork.local' },
      { id: 4, name: 'Emily Wong', email: 'emily@easywork.local' },
      { id: 5, name: 'Jordan Lee', email: 'jordan@easywork.local' },
    ],
    workspaces: [
      {
        id: 101,
        name: 'EasyWork Core',
        role: 'owner',
        domain_namespace: 'easywork-core',
        industry_vertical: 'Technology & SaaS',
        workspace_logo_data: '',
      },
      {
        id: 102,
        name: 'Client Ops',
        role: 'admin',
        domain_namespace: 'client-ops',
        industry_vertical: 'Professional Services',
        workspace_logo_data: '',
      },
    ],
    membersByWorkspace: {
      101: [
        { id: 1, name: 'Alex Chen', email: 'alex@easywork.local', role: 'owner' },
        { id: 2, name: 'Sarah Chen', email: 'sarah@easywork.local', role: 'admin' },
        { id: 3, name: 'Mike Ross', email: 'mike@easywork.local', role: 'member' },
        { id: 4, name: 'Emily Wong', email: 'emily@easywork.local', role: 'member' },
      ],
      102: [
        { id: 1, name: 'Alex Chen', email: 'alex@easywork.local', role: 'admin' },
        { id: 5, name: 'Jordan Lee', email: 'jordan@easywork.local', role: 'owner' },
      ],
      103: [
        { id: 1, name: 'Alex Chen', email: 'alex@easywork.local', role: 'member' },
        { id: 6, name: 'Priya Singh', email: 'priya@easywork.local', role: 'owner' },
      ],
    },
    tasksByWorkspace: {
      101: [
        {
          id: 1001,
          workspace_id: 101,
          title: 'Refine onboarding flow',
          description: 'Tighten first-run UX and reduce drop-off in account setup.',
          status: 'in_progress',
          priority: 'high',
          due_date: '2026-04-08',
          assignee: { id: 2, name: 'Sarah Chen' },
          story_points: 5,
          story_point_vote_count: 3,
        },
        {
          id: 1002,
          workspace_id: 101,
          title: 'Ship landing analytics tracking',
          description: 'Connect CTA events to the new analytics dashboard.',
          status: 'pending',
          priority: 'medium',
          due_date: '2026-04-10',
          assignee: { id: 1, name: 'Alex Chen' },
          story_points: 3,
          story_point_vote_count: 2,
        },
        {
          id: 1003,
          workspace_id: 101,
          title: 'Review invitation copy',
          description: 'Polish invite emails for a more enterprise tone.',
          status: 'completed',
          priority: 'low',
          due_date: '2026-03-28',
          assignee: { id: 4, name: 'Emily Wong' },
          story_points: 2,
          story_point_vote_count: 1,
        },
      ],
      102: [
        {
          id: 2001,
          workspace_id: 102,
          title: 'Client renewal checklist',
          description: 'Prepare renewal board and identify blockers.',
          status: 'in_progress',
          priority: 'urgent',
          due_date: '2026-04-05',
          assignee: { id: 1, name: 'Alex Chen' },
          story_points: 8,
          story_point_vote_count: 4,
        },
      ],
      103: [],
    },
    invitations: [
      {
        id: 7001,
        workspace_id: 103,
        workspace_name: 'Growth Lab',
        inviter: { id: 6, name: 'Priya Singh' },
        invitee_email: 'alex@easywork.local',
        invitee_name: 'Alex Chen',
        role: 'member',
        status: 'pending',
        code: 'GROWTH-LAB-INVITE',
      },
      {
        id: 7002,
        workspace_id: 101,
        workspace_name: 'EasyWork Core',
        inviter: { id: 1, name: 'Alex Chen' },
        invitee_email: 'newhire@easywork.local',
        invitee_name: 'New Hire',
        role: 'member',
        status: 'pending',
        code: 'CORE-NEW-HIRE',
      },
    ],
    suggestions: [
      { name: 'Lina Park', email: 'lina@easywork.local', reason: 'Frequent collaborator', interaction_count: 8 },
      { name: 'Noah Patel', email: 'noah@easywork.local', reason: 'Recent assignee', interaction_count: 5 },
      { name: 'Ava Kim', email: 'ava@easywork.local', reason: 'Mentioned in discussions', interaction_count: 3 },
    ],
    nextTaskId: 3000,
    nextWorkspaceId: 200,
    nextInvitationId: 8000,
  };
}

function readState() {
  if (typeof window === 'undefined') return createDefaultState();
  try {
    const raw = window.localStorage.getItem(DEMO_STATE_KEY);
    return raw ? JSON.parse(raw) : createDefaultState();
  } catch {
    return createDefaultState();
  }
}

function writeState(state) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state));
}

function readSession() {
  if (typeof window === 'undefined') return { token: 'demo-token', user: DEMO_USER };
  try {
    const raw = window.localStorage.getItem(DEMO_SESSION_KEY);
    return raw ? JSON.parse(raw) : { token: 'demo-token', user: DEMO_USER };
  } catch {
    return { token: 'demo-token', user: DEMO_USER };
  }
}

function writeSession(session) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(DEMO_SESSION_KEY);
}

function ensureWorkspaceCollections(state, workspaceId) {
  if (!state.membersByWorkspace[workspaceId]) state.membersByWorkspace[workspaceId] = [];
  if (!state.tasksByWorkspace[workspaceId]) state.tasksByWorkspace[workspaceId] = [];
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getCurrentUser() {
  return readSession().user || DEMO_USER;
}

function findWorkspace(state, workspaceId) {
  return state.workspaces.find((item) => item.id === Number(workspaceId));
}

function computeWorkspaceStats(tasks) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    overdue: tasks.filter((task) => task.due_date && task.due_date < today && task.status !== 'completed').length,
  };
}

function computeMyStats(tasks) {
  const currentUser = getCurrentUser();
  return {
    in_progress: tasks.filter((task) => task.status === 'in_progress' && task.assignee?.id === currentUser.id).length,
    pending: tasks.filter((task) => task.status === 'pending' && task.assignee?.id === currentUser.id).length,
    completed: tasks.filter((task) => task.status === 'completed' && task.assignee?.id === currentUser.id).length,
  };
}

export const demoApi = {
  getDefaultSession() {
    const session = readSession();
    if (!session?.token) {
      const next = { token: 'demo-token', user: DEMO_USER };
      writeSession(next);
      return next;
    }
    return session;
  },

  async register(payload) {
    return {
      message: `Demo mode: account for ${payload.email} created locally.`,
      verification_url: '/login?verified=1',
    };
  },

  async login(payload) {
    const nextSession = {
      token: 'demo-token',
      user: {
        id: 1,
        name: payload.email?.split('@')[0] || DEMO_USER.name,
        email: payload.email || DEMO_USER.email,
      },
    };
    writeSession(nextSession);
    return { session_token: nextSession.token, user: nextSession.user };
  },

  async forgotPassword(payload) {
    return {
      message: `Demo mode: reset email prepared for ${payload.email}.`,
      reset_url: '/reset-password?token=demo-reset-token',
    };
  },

  async resetPassword() {
    return { message: 'Demo mode: password reset successful.' };
  },

  async logout() {
    clearSession();
    return { success: true };
  },

  async getProfile() {
    return { user: readSession().user || DEMO_USER };
  },

  async getProfileSummary() {
    const state = readState();
    const currentUser = getCurrentUser();
    const pending = state.invitations.filter((item) => item.invitee_email === currentUser.email && item.status === 'pending').length;
    return {
      user: currentUser,
      workspaces_count: state.workspaces.length,
      pending_invitations_count: pending,
    };
  },

  async updateProfile(payload) {
    const session = readSession();
    const nextSession = { ...session, user: { ...session.user, ...payload } };
    writeSession(nextSession);
    const state = readState();
    state.users = state.users.map((user) => (user.id === nextSession.user.id ? { ...user, ...payload } : user));
    writeState(state);
    return { user: nextSession.user };
  },

  async changePassword() {
    return { message: 'Demo mode: password changed.' };
  },

  async getOAuthProviders() {
    return { providers: [] };
  },

  async listWorkspaces() {
    const state = readState();
    return { workspaces: clone(state.workspaces) };
  },

  async createWorkspace(payload) {
    const state = readState();
    const currentUser = getCurrentUser();
    const next = {
      id: state.nextWorkspaceId++,
      name: payload.name,
      role: 'owner',
      domain_namespace: payload.domain_namespace || payload.name.toLowerCase().replace(/\s+/g, '-'),
      industry_vertical: payload.industry_vertical || 'Other',
      workspace_logo_data: payload.workspace_logo_data || '',
    };
    state.workspaces.unshift(next);
    state.membersByWorkspace[next.id] = [{ id: currentUser.id, name: currentUser.name, email: currentUser.email, role: 'owner' }];
    state.tasksByWorkspace[next.id] = [];
    writeState(state);
    return clone(next);
  },

  async updateWorkspace(workspaceId, payload) {
    const state = readState();
    const target = findWorkspace(state, workspaceId);
    Object.assign(target, payload);
    writeState(state);
    return clone(target);
  },

  async deleteWorkspace(workspaceId) {
    const state = readState();
    state.workspaces = state.workspaces.filter((item) => item.id !== Number(workspaceId));
    delete state.membersByWorkspace[workspaceId];
    delete state.tasksByWorkspace[workspaceId];
    writeState(state);
    return { success: true };
  },

  async listMembers(workspaceId) {
    const state = readState();
    ensureWorkspaceCollections(state, workspaceId);
    return { members: clone(state.membersByWorkspace[workspaceId]) };
  },

  async getMember(workspaceId, memberId) {
    const state = readState();
    ensureWorkspaceCollections(state, workspaceId);
    return clone(state.membersByWorkspace[workspaceId].find((member) => member.id === Number(memberId)));
  },

  async updateMemberRole(workspaceId, memberId, role) {
    const state = readState();
    const member = state.membersByWorkspace[workspaceId].find((item) => item.id === Number(memberId));
    if (member) member.role = role;
    const workspace = findWorkspace(state, workspaceId);
    if (member?.id === getCurrentUser().id && workspace) workspace.role = role;
    writeState(state);
    return clone(member);
  },

  async removeMember(workspaceId, memberId) {
    const state = readState();
    state.membersByWorkspace[workspaceId] = (state.membersByWorkspace[workspaceId] || []).filter((item) => item.id !== Number(memberId));
    writeState(state);
    return { success: true };
  },

  async transferOwnership(workspaceId, newOwnerUserId) {
    const state = readState();
    const members = state.membersByWorkspace[workspaceId] || [];
    members.forEach((member) => {
      if (member.id === Number(newOwnerUserId)) member.role = 'owner';
      else if (member.id === getCurrentUser().id && member.role === 'owner') member.role = 'admin';
    });
    const workspace = findWorkspace(state, workspaceId);
    if (workspace && workspace.role === 'owner') workspace.role = 'admin';
    writeState(state);
    return { success: true };
  },

  async listWorkspaceInvitations(workspaceId) {
    const state = readState();
    return { invitations: clone(state.invitations.filter((item) => item.workspace_id === Number(workspaceId))) };
  },

  async createInvitation(workspaceId, payload) {
    const state = readState();
    const workspace = findWorkspace(state, workspaceId);
    const invite = {
      id: state.nextInvitationId++,
      workspace_id: Number(workspaceId),
      workspace_name: workspace?.name || 'Workspace',
      inviter: { id: getCurrentUser().id, name: getCurrentUser().name },
      invitee_email: payload.email,
      invitee_name: payload.email.split('@')[0],
      role: payload.role,
      status: 'pending',
      code: `INV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    };
    state.invitations.unshift(invite);
    writeState(state);
    return clone(invite);
  },

  async resendInvitation(workspaceId, invitationId) {
    const state = readState();
    const invite = state.invitations.find((item) => item.workspace_id === Number(workspaceId) && item.id === Number(invitationId));
    return clone(invite || { success: true });
  },

  async revokeInvitation(workspaceId, invitationId) {
    const state = readState();
    state.invitations = state.invitations.map((item) => item.id === Number(invitationId) && item.workspace_id === Number(workspaceId) ? { ...item, status: 'revoked' } : item);
    writeState(state);
    return { success: true };
  },

  async listPendingInvitations() {
    const state = readState();
    const currentUser = getCurrentUser();
    return { invitations: clone(state.invitations.filter((item) => item.invitee_email === currentUser.email && item.status === 'pending')) };
  },

  async getInvitation(invitationId) {
    const state = readState();
    return clone(state.invitations.find((item) => item.id === Number(invitationId)));
  },

  async acceptInvitation(code) {
    const state = readState();
    const invite = state.invitations.find((item) => item.code === code && item.status === 'pending');
    if (!invite) throw new Error('Invitation not found.');
    invite.status = 'accepted';
    const exists = state.workspaces.some((item) => item.id === invite.workspace_id);
    if (!exists) {
      state.workspaces.push({
        id: invite.workspace_id,
        name: invite.workspace_name,
        role: invite.role,
        domain_namespace: invite.workspace_name.toLowerCase().replace(/\s+/g, '-'),
        industry_vertical: 'Other',
        workspace_logo_data: '',
      });
    }
    ensureWorkspaceCollections(state, invite.workspace_id);
    state.membersByWorkspace[invite.workspace_id].push({ id: getCurrentUser().id, name: getCurrentUser().name, email: getCurrentUser().email, role: invite.role });
    writeState(state);
    return { workspace_id: invite.workspace_id, workspace_name: invite.workspace_name, role: invite.role };
  },

  async declineInvitation(invitationId) {
    const state = readState();
    state.invitations = state.invitations.map((item) => item.id === Number(invitationId) ? { ...item, status: 'declined' } : item);
    writeState(state);
    return { success: true };
  },

  async listInviteSuggestions() {
    return { suggestions: clone(readState().suggestions) };
  },

  async listTasks(workspaceId, params = {}) {
    const state = readState();
    ensureWorkspaceCollections(state, workspaceId);
    let tasks = clone(state.tasksByWorkspace[workspaceId]);
    if (params.status) tasks = tasks.filter((task) => task.status === params.status);
    if (params.priority) tasks = tasks.filter((task) => task.priority === params.priority);
    if (params.search) {
      const q = params.search.toLowerCase();
      tasks = tasks.filter((task) => [task.title, task.description, task.assignee?.name].filter(Boolean).some((value) => value.toLowerCase().includes(q)));
    }
    if (params.limit) tasks = tasks.slice(0, Number(params.limit));
    return { tasks };
  },

  async createTask(workspaceId, payload) {
    const state = readState();
    ensureWorkspaceCollections(state, workspaceId);
    const assignee = payload.assignee_id
      ? (state.membersByWorkspace[workspaceId] || []).find((member) => member.id === Number(payload.assignee_id))
      : null;
    const task = {
      id: state.nextTaskId++,
      workspace_id: Number(workspaceId),
      title: payload.title,
      description: payload.description || '',
      due_date: payload.due_date || '',
      assignee: assignee ? { id: assignee.id, name: assignee.name } : null,
      priority: payload.priority || 'medium',
      status: payload.status || 'pending',
      story_points: payload.story_points ?? null,
      story_point_vote_count: payload.story_points ? 1 : 0,
    };
    state.tasksByWorkspace[workspaceId].unshift(task);
    writeState(state);
    return clone(task);
  },

  async getTask(taskId) {
    const state = readState();
    const task = Object.values(state.tasksByWorkspace).flat().find((item) => item.id === Number(taskId));
    return clone(task);
  },

  async updateTask(taskId, payload) {
    const state = readState();
    let updated = null;
    Object.keys(state.tasksByWorkspace).forEach((workspaceId) => {
      state.tasksByWorkspace[workspaceId] = state.tasksByWorkspace[workspaceId].map((task) => {
        if (task.id !== Number(taskId)) return task;
        const assignee = payload.assignee_id
          ? (state.membersByWorkspace[workspaceId] || []).find((member) => member.id === Number(payload.assignee_id))
          : null;
        updated = {
          ...task,
          ...payload,
          assignee: assignee ? { id: assignee.id, name: assignee.name } : null,
        };
        return updated;
      });
    });
    writeState(state);
    return clone(updated);
  },

  async voteStoryPoints(taskId, points) {
    const state = readState();
    let updated = null;
    Object.keys(state.tasksByWorkspace).forEach((workspaceId) => {
      state.tasksByWorkspace[workspaceId] = state.tasksByWorkspace[workspaceId].map((task) => {
        if (task.id !== Number(taskId)) return task;
        updated = {
          ...task,
          story_points: Number(points),
          story_point_vote_count: (task.story_point_vote_count || 0) + 1,
        };
        return updated;
      });
    });
    writeState(state);
    return clone(updated);
  },

  async deleteTask(taskId) {
    const state = readState();
    Object.keys(state.tasksByWorkspace).forEach((workspaceId) => {
      state.tasksByWorkspace[workspaceId] = state.tasksByWorkspace[workspaceId].filter((task) => task.id !== Number(taskId));
    });
    writeState(state);
    return { success: true };
  },

  async getWorkspaceStats(workspaceId) {
    const state = readState();
    return computeWorkspaceStats(state.tasksByWorkspace[workspaceId] || []);
  },

  async getMyStats(workspaceId) {
    const state = readState();
    return computeMyStats(state.tasksByWorkspace[workspaceId] || []);
  },
};
