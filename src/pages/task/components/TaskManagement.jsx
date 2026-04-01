import React, { useMemo, useState } from 'react';
import { tasks } from '../data/taskData';
import TaskEditorPanel from './TaskEditorPanel';
import TaskTable from './TaskTable';

export default function TaskManagement() {
  const [selectedId, setSelectedId] = useState(2);

  const rows = useMemo(() => tasks, []);

  return (
    <section className="task-management-layout">
      <div className="task-management-left">
        <h1 className="task-management-title">Task Management</h1>
        <TaskTable rows={rows} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div className="task-management-right">
        <TaskEditorPanel />
      </div>
    </section>
  );
}
