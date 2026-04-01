import profileAvatar from '../../../assets/avatars/a1.png';
import alexAvatar from '../../../assets/avatars/a9.png';
import sarahAvatar from '../../../assets/avatars/a2.png';
import mikeAvatar from '../../../assets/avatars/a7.png';
import emilyAvatar from '../../../assets/avatars/a8.png';
import jifonAvatar from '../../../assets/avatars/a4.png';
import eforiaAvatar from '../../../assets/avatars/a6.png';
import morisAvatar from '../../../assets/avatars/a3.png';

export const profile = {
  name: 'Alex Chen',
  avatar: profileAvatar,
};

export const stats = [
  { id: 'tasks', title: 'Total Tasks', value: '124', note: '+5 this week', noteType: 'positive', color: 'blue', points: '8,38 24,50 42,18 58,28 75,30 95,8 118,14 132,2' },
  { id: 'progress', title: 'In Progress', value: '48', note: '32% completion', noteType: 'muted', color: 'yellow', points: '8,50 30,22 45,12 60,34 78,0 94,24 113,20 132,10' },
  { id: 'completed', title: 'Completed', value: '76', note: '+12% this week', noteType: 'positive', color: 'green', points: '8,44 24,28 41,22 60,38 82,0 102,24 120,2 132,16' },
  { id: 'productivity', title: 'Team Productivity', value: '89%', note: 'Top 15% vs. last month', noteType: 'muted', color: 'purple', points: '8,14 36,14 54,38 76,36 98,4 118,18 132,16' },
];

export const members = [
  { name: 'Alex', avatar: alexAvatar },
  { name: 'Sarah', avatar: sarahAvatar },
  { name: 'Mike', avatar: mikeAvatar },
  { name: 'Emily', avatar: emilyAvatar },
  { name: 'Jifon', avatar: jifonAvatar },
  { name: 'Eforia', avatar: eforiaAvatar },
  { name: 'Moris', avatar: morisAvatar },
];

export const activities = [
  { type: 'check', text: 'Completed and ney completed', time: '2 mins ago' },
  { type: 'avatar', text: "Sarah J. completed 'Q2 Marketing Plan'", time: '2 hours ago', avatar: members[1].avatar },
  { type: 'comment', text: "New comment on 'Website Redesign'", time: '2 hours ago' },
  { type: 'calendar', text: 'Team meeting scheduled for tomorrow at 10 AM', time: '4 hours ago' },
];
