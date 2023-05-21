/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const tasks: { [key: string]: object } = {
    'task-1': {
      id: 'task-1',
      content: 'check for mails',
      heading: true,
      progress: true,
      user: true,
      description: true,
      footer: true,
      image: false,
      type: false,
    },
    'task-2': {
      id: 'task-2',
      content: 'check for messages',
      heading: true,
      progress: true,
      user: true,
      description: false,
      footer: true,
      image: false,
      type: false,
    },
    'task-3': {
      id: 'task-3',
      content: 'check for water level',
      heading: true,
      progress: true,
      user: true,
      description: false,
      footer: false,
      image: false,
      type: false,
    },
    'task-4': {
      id: 'task-4',
      content: 'check for health issues',
      heading: true,
      progress: false,
      user: false,
      description: false,
      footer: false,
      image: false,
      type: false,
    },
    'task-5': {
      id: 'task-5',
      content: 'go for a walk',
      heading: true,
      progress: true,
      user: true,
      description: false,
      footer: false,
      image: true,
      type: false,
    },
    'task-6': {
      id: 'task-5',
      content: 'go for a swim and walk',
      heading: true,
      progress: true,
      user: true,
      description: false,
      footer: true,
      image: false,
      type: true,
    },
  };

  const columns: { [key: string]: object } = {
    'column-1': {
      id: 'column-1',
      title: 'To-do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In-Progress',
      taskIds: ['task-3', 'task-4', 'task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-6'],
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
  return initialData;
};
export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: generateInitialState,
  reducers: {
    updateCardPosition: (state, action: PayloadAction<any>) => {
      state.columnOrder = action.payload;
    },
  },
});

export const { updateCardPosition } = kanbanSlice.actions;
export default kanbanSlice.reducer;
