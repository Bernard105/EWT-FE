import React from 'react';

function StatusPill({ status }) {
  const className =
    status === 'Completed'
      ? 'is-completed'
      : status === 'In Progress'
        ? 'is-progress'
        : 'is-todo';

  return <span className={`status-pill ${className}`}>{status}</span>;
}

export default function TaskTable({ rows, selectedId, onSelect }) {
  return (
    <div className="task-table-shell glass-panel">
      <div className="task-table-headbar">
        <h2 className="card-title">Task Table</h2>
      </div>

      <div className="task-table-wrap subtle-scrollbar">
        <table className="task-table-grid">
          <thead>
            <tr>
              <th className="checkbox-col">
                <span className="checkbox-box" />
              </th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((task) => (
              <tr
                key={task.id}
                className={selectedId === task.id ? 'is-selected' : ''}
                onClick={() => onSelect(task.id)}
              >
                <td className="checkbox-col">
                  <span className="checkbox-box" />
                </td>
                <td className="task-name-cell">{task.name}</td>
                <td>
                  <StatusPill status={task.status} />
                </td>
                <td>
                  <div className="assignee-cell">
                    <img src={task.assignee.avatar} alt={task.assignee.name} />
                  </div>
                </td>
                <td className="due-date-cell">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
