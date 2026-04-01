import React, { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useWorkspace } from '../../context/WorkspaceContext';
import { taskService } from '../../services';
import '../../styles/analytics/AnalyticsPage.css';

export default function AnalyticsPage() {
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();
  const [stats, setStats] = useState(null);
  const [myStats, setMyStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!activeWorkspaceId) return;
    Promise.all([
      taskService.getWorkspaceStats(activeWorkspaceId),
      taskService.getMyStats(activeWorkspaceId),
      taskService.listTasks(activeWorkspaceId, { limit: 50 }),
    ]).then(([workspaceStats, myTaskStats, taskResponse]) => {
      setStats(workspaceStats);
      setMyStats(myTaskStats);
      setTasks(taskResponse.tasks || []);
      setError('');
    }).catch((err) => setError(err.message || 'Unable to load analytics'));
  }, [activeWorkspaceId]);

  const priorityBreakdown = useMemo(() => {
    const summary = { low: 0, medium: 0, high: 0, urgent: 0 };
    tasks.forEach((task) => { summary[task.priority] = (summary[task.priority] || 0) + 1; });
    return Object.entries(summary);
  }, [tasks]);

  if (!activeWorkspace) {
    return <AppShell title="Analytics" subtitle="Select a workspace first."><div className="analytics-empty">Choose a workspace to view analytics.</div></AppShell>;
  }

  return (
    <AppShell title="Analytics" subtitle={`Derived from backend task stats for ${activeWorkspace.name}.`}>
      {error ? <div className="analytics-message">{error}</div> : null}
      <section className="analytics-grid">
        <article className="analytics-card large">
          <h2>Workspace performance</h2>
          <div className="analytics-stat-lines">
            <div><span>Total</span><strong>{stats?.total ?? 0}</strong></div>
            <div><span>Pending</span><strong>{stats?.pending ?? 0}</strong></div>
            <div><span>In progress</span><strong>{stats?.in_progress ?? 0}</strong></div>
            <div><span>Completed</span><strong>{stats?.completed ?? 0}</strong></div>
            <div><span>Overdue</span><strong>{stats?.overdue ?? 0}</strong></div>
          </div>
        </article>

        <article className="analytics-card">
          <h2>My workload</h2>
          <div className="analytics-stat-lines compact">
            <div><span>Total</span><strong>{myStats?.total ?? 0}</strong></div>
            <div><span>Pending</span><strong>{myStats?.pending ?? 0}</strong></div>
            <div><span>In progress</span><strong>{myStats?.in_progress ?? 0}</strong></div>
            <div><span>Completed</span><strong>{myStats?.completed ?? 0}</strong></div>
          </div>
        </article>

        <article className="analytics-card">
          <h2>Priority mix</h2>
          <div className="analytics-priority-list">
            {priorityBreakdown.map(([priority, count]) => (
              <div key={priority} className="analytics-priority-row">
                <span>{priority}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
