import React from 'react';
import { editorData } from '../data/taskData';
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  PlusIcon,
  UnderlineIcon,
} from './Icons';

function Toolbar() {
  return (
    <div className="editor-toolbar">
      <button type="button"><BoldIcon /></button>
      <button type="button"><ItalicIcon /></button>
      <button type="button"><UnderlineIcon /></button>
      <button type="button"><LinkIcon /></button>
      <span className="editor-toolbar-divider" />
      <button type="button"><ListBulletsIcon /></button>
      <button type="button"><ListNumbersIcon /></button>
      <button type="button"><ListBulletsIcon /></button>
      <button type="button"><ListNumbersIcon /></button>
    </div>
  );
}

function EditorField({ label, children }) {
  return (
    <div className="editor-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function SelectField({ label, value, avatar }) {
  return (
    <div className="editor-half-field">
      <label>{label}</label>
      <button type="button" className="editor-selectbox">
        <div className="editor-selectbox-value">
          {avatar ? <img src={avatar} alt={value} /> : <span className="editor-select-placeholder">{value}</span>}
          {!avatar ? null : <span>{value}</span>}
        </div>
        <ChevronDownIcon />
      </button>
    </div>
  );
}

export default function TaskEditorPanel() {
  return (
    <aside className="task-editor-shell glass-panel">
      <div className="task-editor-topbar">
        <button type="button" className="task-editor-cancel">Cancel</button>
        <button type="button" className="task-editor-submit">Create Task</button>
      </div>

      <div className="task-editor-body subtle-scrollbar">
        <EditorField label="Task Name">
          <input className="editor-input" value={editorData.taskName} readOnly />
        </EditorField>

        <EditorField label="Description">
          <div className="editor-box">
            <Toolbar />
            <div className="editor-surface" />
          </div>
        </EditorField>

        <div className="editor-row-two">
          <SelectField label="Assignee" value={editorData.assignee.name} avatar={editorData.assignee.avatar} />
          <SelectField label="Due Date" value="Status" />
        </div>

        <EditorField label="Comments">
          <div className="editor-box">
            <Toolbar />
            <div className="editor-surface editor-surface-small" />
          </div>
        </EditorField>

        <div className="editor-field">
          <div className="editor-attachments-head">
            <label>Attachments</label>
            <button type="button" className="upload-more-link">Upload more</button>
          </div>

          <div className="editor-attachments-grid">
            {editorData.attachments.map((item) => (
              <div key={item.id} className="attachment-card">
                <img src={item.image} alt={item.alt} />
              </div>
            ))}
            <button type="button" className="attachment-card attachment-card-add">
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
