import React, { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useWorkspace } from '../../context/WorkspaceContext';
import { taskService, workspaceService } from '../../services';
import '../../styles/dashboard/App.css';

function StatCard({ label, value, note }) {
  return (
    <article className="db-stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

export default function DashboardOverviewPage() {
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();
  const [stats, setStats] = useState(null);
  const [myStats, setMyStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!activeWorkspaceId) return;
    let active = true;
    Promise.all([
      taskService.getWorkspaceStats(activeWorkspaceId),
      taskService.getMyStats(activeWorkspaceId),
      taskService.listTasks(activeWorkspaceId, { limit: 6 }),
      workspaceService.listMembers(activeWorkspaceId),
    ])
      .then(([workspaceStats, myTaskStats, taskResponse, memberResponse]) => {
        if (!active) return;
        setStats(workspaceStats);
        setMyStats(myTaskStats);
        setTasks(taskResponse.tasks || []);
        setMembers(memberResponse.members || []);
        setMessage('');
      })
      .catch((error) => {
        if (!active) return;
        setMessage(error.message || 'Unable to load dashboard');
      });
    return () => {
      active = false;
    };
  }, [activeWorkspaceId]);

  const completionRate = useMemo(() => {
    if (!stats?.total) return '0%';
    return `${Math.round((stats.completed / stats.total) * 100)}%`;
  }, [stats]);

  if (!activeWorkspace) {
    return (
      <AppShell title="Dashboard" subtitle="Select a workspace first to load dashboard metrics and recent activity.">
        <div className="db-empty">No workspace selected. Go to Workspaces and choose one first.</div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={activeWorkspace.name}
      subtitle={`Workspace overview backed by /api/workspaces/${activeWorkspaceId}/stats, /my-stats, /tasks and /members.`}
    >
      {message ? <div className="db-message">{message}</div> : null}
      <section className="db-stats-grid">
        <StatCard label="Total tasks" value={stats?.total ?? '—'} note="Workspace scope" />
        <StatCard label="Completed" value={stats?.completed ?? '—'} note={`Completion rate ${completionRate}`} />
        <StatCard label="My in progress" value={myStats?.in_progress ?? '—'} note="Assigned to you" />
        <StatCard label="Overdue" value={stats?.overdue ?? '—'} note="Needs attention" />
      </section>

      <section className="db-content-grid">
        <article className="db-card">
          <div className="db-card-head">
            <h2>Recent tasks</h2>
            <span>{tasks.length} loaded</span>
          </div>
          <div className="db-task-list">
            {tasks.map((task) => (
              <div className="db-task-row" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description || 'No description yet.'}</p>
                </div>
                <div className="db-task-meta">
                  <span className={`db-status status-${task.status}`}>{task.status.replace('_', ' ')}</span>
                  <small>{task.assignee?.name || 'Unassigned'}</small>
                </div>
              </div>
            ))}
            {!tasks.length ? <div className="db-empty-inline">No tasks found for this workspace.</div> : null}
          </div>
        </article>

        <article className="db-card">
          <div className="db-card-head">
            <h2>Members</h2>
            <span>{members.length}</span>
          </div>
          <div className="db-member-list">
            {members.slice(0, 8).map((member) => (
              <div className="db-member-row" key={member.id}>
                <div className="db-avatar">{member.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <strong>{member.name}</strong>
                  <p>{member.email}</p>
                </div>
                <span className="db-role-pill">{member.role}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
