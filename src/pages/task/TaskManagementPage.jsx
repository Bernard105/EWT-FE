import React, { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/app/AppShell';
import { useWorkspace } from '../../context/WorkspaceContext';
import { taskService, workspaceService } from '../../services';
import '../../styles/task/App.css';

const EMPTY_FORM = {
  title: '',
  description: '',
  due_date: '',
  priority: 'medium',
  status: 'pending',
  assignee_id: '',
  story_points: '',
};

function TaskRow({ task, active, onSelect }) {
  return (
    <button type="button" className={`tm-row ${active ? 'active' : ''}`} onClick={() => onSelect(task)}>
      <div>
        <strong>{task.title}</strong>
        <span>{task.sku}</span>
      </div>
      <span className={`tm-pill ${task.status}`}>{task.status.replace('_', ' ')}</span>
      <span>{task.assignee?.name || 'Unassigned'}</span>
      <span>{task.due_date || '—'}</span>
    </button>
  );
}

export default function TaskManagementPage() {
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [form, setForm] = useState(EMPTY_FORM);
  const [votePoints, setVotePoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadTasks = async () => {
    if (!activeWorkspaceId) return;
    setLoading(true);
    try {
      const params = { limit: 50, search: filters.search, status: filters.status, priority: filters.priority };
      const [taskResponse, memberResponse] = await Promise.all([
        taskService.listTasks(activeWorkspaceId, params),
        workspaceService.listMembers(activeWorkspaceId),
      ]);
      setTasks(taskResponse.tasks || []);
      setMembers(memberResponse.members || []);
      if (selectedTask) {
        const fresh = (taskResponse.tasks || []).find((item) => item.id === selectedTask.id);
        setSelectedTask(fresh || null);
      }
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, [activeWorkspaceId, filters.status, filters.priority]);
  useEffect(() => {
    const timer = setTimeout(() => { loadTasks(); }, 250);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const selectedTaskDetails = useMemo(() => selectedTask, [selectedTask]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!activeWorkspaceId) return;
    setSaving(true);
    setMessage('');
    try {
      await taskService.createTask(activeWorkspaceId, {
        title: form.title,
        description: form.description || null,
        due_date: form.due_date || null,
        assignee_id: form.assignee_id ? Number(form.assignee_id) : null,
        story_points: form.story_points ? Number(form.story_points) : null,
        priority: form.priority,
        status: form.status,
      });
      setForm(EMPTY_FORM);
      await loadTasks();
      setMessage('Task created successfully.');
    } catch (error) {
      setMessage(error.message || 'Unable to create task');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!selectedTaskDetails) return;
    setSaving(true);
    setMessage('');
    try {
      const updated = await taskService.updateTask(selectedTaskDetails.id, {
        title: selectedTaskDetails.title,
        description: selectedTaskDetails.description || null,
        due_date: selectedTaskDetails.due_date || null,
        assignee_id: selectedTaskDetails.assignee?.id || null,
        priority: selectedTaskDetails.priority,
        status: selectedTaskDetails.status,
      });
      setSelectedTask(updated);
      await loadTasks();
      setMessage('Task updated.');
    } catch (error) {
      setMessage(error.message || 'Unable to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTaskDetails) return;
    const confirmed = window.confirm(`Delete task “${selectedTaskDetails.title}”?`);
    if (!confirmed) return;
    setSaving(true);
    setMessage('');
    try {
      await taskService.deleteTask(selectedTaskDetails.id);
      setSelectedTask(null);
      await loadTasks();
      setMessage('Task deleted.');
    } catch (error) {
      setMessage(error.message || 'Unable to delete task');
    } finally {
      setSaving(false);
    }
  };

  const handleVote = async () => {
    if (!selectedTaskDetails || votePoints === '') return;
    setSaving(true);
    setMessage('');
    try {
      const updated = await taskService.voteStoryPoints(selectedTaskDetails.id, Number(votePoints));
      setSelectedTask(updated);
      await loadTasks();
      setVotePoints('');
      setMessage('Story point vote submitted.');
    } catch (error) {
      setMessage(error.message || 'Unable to submit story point vote');
    } finally {
      setSaving(false);
    }
  };

  if (!activeWorkspace) {
    return <AppShell title="Tasks" subtitle="Select a workspace first."><div className="tm-empty">Pick a workspace from the selector before working with tasks.</div></AppShell>;
  }

  return (
    <AppShell title="Task management" subtitle={`Fully connected to task endpoints for ${activeWorkspace.name}.`}>
      <div className="tm-toolbar">
        <div className="tm-filter-row">
          <input value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search by title, description, assignee or SKU" />
          <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="">All status</option>
            <option value="pending">pending</option>
            <option value="in_progress">in_progress</option>
            <option value="completed">completed</option>
          </select>
          <select value={filters.priority} onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value }))}>
            <option value="">All priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="urgent">urgent</option>
          </select>
        </div>
        <p>{message || (loading ? 'Loading tasks…' : `${tasks.length} tasks loaded`)}</p>
      </div>

      <div className="tm-layout">
        <section className="tm-panel">
          <div className="tm-panel-head">
            <h2>Task list</h2>
            <span>GET /api/workspaces/{activeWorkspaceId}/tasks</span>
          </div>
          <div className="tm-list">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} active={selectedTaskDetails?.id === task.id} onSelect={setSelectedTask} />
            ))}
            {!tasks.length ? <div className="tm-empty-inline">No tasks match the current filters.</div> : null}
          </div>
        </section>

        <section className="tm-panel">
          <div className="tm-panel-head"><h2>Create task</h2><span>POST /api/workspaces/{activeWorkspaceId}/tasks</span></div>
          <form className="tm-form" onSubmit={handleCreate}>
            <label><span>Title</span><input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} /></label>
            <label><span>Description</span><textarea rows={4} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} /></label>
            <div className="tm-form-grid">
              <label><span>Due date</span><input type="date" value={form.due_date} onChange={(event) => setForm((current) => ({ ...current, due_date: event.target.value }))} /></label>
              <label><span>Assignee</span><select value={form.assignee_id} onChange={(event) => setForm((current) => ({ ...current, assignee_id: event.target.value }))}><option value="">Unassigned</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label>
              <label><span>Priority</span><select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}><option value="low">low</option><option value="medium">medium</option><option value="high">high</option><option value="urgent">urgent</option></select></label>
              <label><span>Status</span><select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}><option value="pending">pending</option><option value="in_progress">in_progress</option><option value="completed">completed</option></select></label>
              <label><span>Story points</span><input type="number" min="0" value={form.story_points} onChange={(event) => setForm((current) => ({ ...current, story_points: event.target.value }))} /></label>
            </div>
            <button className="tm-primary-btn" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create task'}</button>
          </form>
        </section>
      </div>

      <section className="tm-panel tm-editor-panel">
        <div className="tm-panel-head"><h2>Selected task</h2><span>{selectedTaskDetails ? `Task #${selectedTaskDetails.id}` : 'Select one task'}</span></div>
        {selectedTaskDetails ? (
          <form className="tm-form" onSubmit={handleUpdate}>
            <label><span>Title</span><input value={selectedTaskDetails.title} onChange={(event) => setSelectedTask((current) => ({ ...current, title: event.target.value }))} /></label>
            <label><span>Description</span><textarea rows={4} value={selectedTaskDetails.description || ''} onChange={(event) => setSelectedTask((current) => ({ ...current, description: event.target.value }))} /></label>
            <div className="tm-form-grid">
              <label><span>Due date</span><input type="date" value={selectedTaskDetails.due_date || ''} onChange={(event) => setSelectedTask((current) => ({ ...current, due_date: event.target.value }))} /></label>
              <label><span>Assignee</span><select value={selectedTaskDetails.assignee?.id || ''} onChange={(event) => {
                const member = members.find((item) => item.id === Number(event.target.value));
                setSelectedTask((current) => ({ ...current, assignee: member ? { id: member.id, name: member.name } : null }));
              }}><option value="">Unassigned</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label>
              <label><span>Priority</span><select value={selectedTaskDetails.priority} onChange={(event) => setSelectedTask((current) => ({ ...current, priority: event.target.value }))}><option value="low">low</option><option value="medium">medium</option><option value="high">high</option><option value="urgent">urgent</option></select></label>
              <label><span>Status</span><select value={selectedTaskDetails.status} onChange={(event) => setSelectedTask((current) => ({ ...current, status: event.target.value }))}><option value="pending">pending</option><option value="in_progress">in_progress</option><option value="completed">completed</option></select></label>
            </div>
            <div className="tm-vote-box">
              <div>
                <strong>Story point voting</strong>
                <p>Current points: {selectedTaskDetails.story_points ?? '—'} • votes: {selectedTaskDetails.story_point_vote_count ?? 0}</p>
              </div>
              <div className="tm-inline-controls">
                <input type="number" min="0" value={votePoints} onChange={(event) => setVotePoints(event.target.value)} placeholder="0" />
                <button type="button" className="tm-secondary-btn" onClick={handleVote} disabled={saving}>Vote</button>
              </div>
            </div>
            <div className="tm-inline-actions">
              <button className="tm-primary-btn" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
              <button className="tm-danger-btn" type="button" onClick={handleDelete} disabled={saving}>Delete task</button>
            </div>
          </form>
        ) : <div className="tm-empty-inline">Click a task row to load details from the backend-driven list.</div>}
      </section>
    </AppShell>
  );
}
