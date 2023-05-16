const tasks: { [key: string]: object } = {
  'task-1': { id: 'task-1', content: 'check for mails' },
  'task-2': { id: 'task-2', content: 'check for messages' },
  'task-3': { id: 'task-3', content: 'check for water level' },
  'task-4': { id: 'task-4', content: 'check for health issues' },
  'task-5': { id: 'task-5', content: 'go for a walk' },
};
const columns: { [key: string]: object } = {
  'column-1': {
    id: 'column-1',
    title: 'To-do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In-Progress',
    taskIds: [],
  },
  'column-3': {
    id: 'column-3',
    title: 'Done',
    taskIds: [],
  },
};
const initialData: {
  tasks: { [key: string]: any };
  columns: { [key: string]: any };
  columnOrder: Array<String>;
} = {
  tasks,
  columns,
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
export default initialData;
