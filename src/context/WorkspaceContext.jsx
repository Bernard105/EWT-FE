import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { useAuth } from './AuthContext';
import { workspaceService } from '../services';

const WorkspaceContext = createContext(null);

function readInitialWorkspaceId() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.activeWorkspaceId);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

export function WorkspaceProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState(readInitialWorkspaceId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setActiveWorkspaceId = (workspaceId) => {
    setActiveWorkspaceIdState(workspaceId || null);
    try {
      if (workspaceId) {
        localStorage.setItem(STORAGE_KEYS.activeWorkspaceId, String(workspaceId));
      } else {
        localStorage.removeItem(STORAGE_KEYS.activeWorkspaceId);
      }
    } catch {
      // ignore
    }
  };

  const refreshWorkspaces = async () => {
    if (!isAuthenticated) {
      setWorkspaces([]);
      setActiveWorkspaceId(null);
      return [];
    }

    setLoading(true);
    setError('');
    try {
      const response = await workspaceService.listWorkspaces();
      const items = response.workspaces || [];
      setWorkspaces(items);

      const hasCurrent = items.some((item) => item.id === activeWorkspaceId);
      if (!hasCurrent) {
        setActiveWorkspaceId(items[0]?.id || null);
      }
      return items;
    } catch (err) {
      setError(err.message || 'Unable to load workspaces');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setWorkspaces([]);
      setActiveWorkspaceId(null);
      return;
    }
    refreshWorkspaces().catch(() => {});
  }, [isAuthenticated]);

  const createWorkspace = async (payload) => {
    const response = await workspaceService.createWorkspace(payload);
    await refreshWorkspaces();
    if (response?.id) setActiveWorkspaceId(response.id);
    return response;
  };

  const updateWorkspace = async (workspaceId, payload) => {
    const response = await workspaceService.updateWorkspace(workspaceId, payload);
    await refreshWorkspaces();
    return response;
  };

  const deleteWorkspace = async (workspaceId) => {
    await workspaceService.deleteWorkspace(workspaceId);
    await refreshWorkspaces();
  };

  const activeWorkspace = workspaces.find((item) => item.id === activeWorkspaceId) || null;

  const value = useMemo(() => ({
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    setActiveWorkspaceId,
    refreshWorkspaces,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    loading,
    error,
  }), [workspaces, activeWorkspace, activeWorkspaceId, loading, error]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
