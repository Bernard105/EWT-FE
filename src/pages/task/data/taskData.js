import avatarAlex from '../../../assets/avatars/a9.png';
import avatarSarah from '../../../assets/avatars/a2.png';
import avatarMike from '../../../assets/avatars/a7.png';
import avatarLeo from '../../../assets/avatars/a4.png';
import avatarMia from '../../../assets/avatars/a6.png';
import avatarEmma from '../../../assets/avatars/a8.png';
import avatarDaniel from '../../../assets/avatars/a3.png';
import profileAvatar from '../../../assets/avatars/a1.png';

import attachmentInvoice from '../../../assets/attachments/att1.png';
import attachmentPreview from '../../../assets/attachments/att2.png';
import attachmentFile from '../../../assets/attachments/att3.png';

export const currentUser = {
  name: 'Alex Chen',
  avatar: profileAvatar,
};

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks', active: true },
  { id: 'team', label: 'Team', icon: 'team' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const assignees = [
  { id: 'alex', name: 'Alex Chen', avatar: avatarAlex },
  { id: 'sarah', name: 'Sarah Chen', avatar: avatarSarah },
  { id: 'mike', name: 'Mike Ross', avatar: avatarMike },
  { id: 'leo', name: 'Leo Park', avatar: avatarLeo },
  { id: 'mia', name: 'Mia Tran', avatar: avatarMia },
  { id: 'emma', name: 'Emma Carter', avatar: avatarEmma },
  { id: 'daniel', name: 'Daniel Kim', avatar: avatarDaniel },
];

const assigneeMap = Object.fromEntries(assignees.map((person) => [person.name, person]));

export const tasks = [
  {
    id: 1,
    name: 'Completed and ney completed',
    status: 'To Do',
    assignee: assigneeMap['Alex Chen'],
    dueDate: 'Dec 5, 2023',
    checked: false,
  },
  {
    id: 2,
    name: "Sarah 'Q2 Marketing Plan'",
    status: 'In Progress',
    assignee: assigneeMap['Sarah Chen'],
    dueDate: 'Dec 5, 2023',
    checked: false,
  },
  {
    id: 3,
    name: "New comment on 'Website Redesign'",
    status: 'In Progress',
    assignee: assigneeMap['Mike Ross'],
    dueDate: 'Dec 5, 2023',
    checked: false,
  },
  {
    id: 4,
    name: 'Team meeting scheduled',
    status: 'Completed',
    assignee: assigneeMap['Leo Park'],
    dueDate: 'Jan. 1, 2023',
    checked: false,
  },
  {
    id: 5,
    name: 'Team meeting scheduled',
    status: 'To Do',
    assignee: assigneeMap['Alex Chen'],
    dueDate: 'May 15, 2023',
    checked: false,
  },
  {
    id: 6,
    name: "Sarah J. completed 'myviigned'",
    status: 'Completed',
    assignee: assigneeMap['Emma Carter'],
    dueDate: 'May 1, 2023',
    checked: false,
  },
  {
    id: 7,
    name: "Sarah J. completed 'fereiempten'",
    status: 'Completed',
    assignee: assigneeMap['Mike Ross'],
    dueDate: 'May 7, 2023',
    checked: false,
  },
  {
    id: 8,
    name: 'Cominon Redesign',
    status: 'In Progress',
    assignee: assigneeMap['Mia Tran'],
    dueDate: 'May 13, 2023',
    checked: false,
  },
  {
    id: 9,
    name: 'Team meeting scheduled',
    status: 'In Progress',
    assignee: assigneeMap['Alex Chen'],
    dueDate: 'Mar 17, 2023',
    checked: false,
  },
  {
    id: 10,
    name: 'Team meeting scheduled',
    status: 'Completed',
    assignee: assigneeMap['Emma Carter'],
    dueDate: 'May 18, 2023',
    checked: false,
  },
];

export const editorData = {
  taskName: '',
  description: '',
  assignee: assignees[0],
  dueDate: '',
  status: 'Status',
  comments: '',
  attachments: [
    { id: 'invoice', image: attachmentInvoice, alt: 'Invoice preview' },
    { id: 'preview', image: attachmentPreview, alt: 'Attachment preview' },
    { id: 'file', image: attachmentFile, alt: 'File attachment' },
  ],
};
