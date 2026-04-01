import { env } from '../config/env';

export const STORAGE_KEYS = {
  authSession: env.authStorageKey,
  activeWorkspaceId: 'ewt_active_workspace_id',
};
