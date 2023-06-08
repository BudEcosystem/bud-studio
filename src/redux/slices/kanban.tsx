/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const generateKanbanInitialState = (): any => {
  const tasks: { [key: string]: object } = {};
  const columns: { [key: string]: object } = {
    'column-0': {
      id: 'column-0',
      title: 'To-do',
      taskIds: [],
    },
    'column-1': {
      id: 'column-1',
      title: 'In-Progress',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Done',
      taskIds: [],
    },
  };
  const initialData: {
    tasks: { [key: string]: any };
    columns: { [key: string]: any };
    columnOrder: Array<String>;
    triggerTaskCreation: boolean;
  } = {
    tasks,
    columns,
    columnOrder: ['column-0', 'column-1', 'column-2'],
    triggerTaskCreation: false,
  };
  return initialData;
};
export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: generateKanbanInitialState,
  reducers: {
    updateCardPosition: (state, action: PayloadAction<any>) => {
      state.columnOrder = action.payload;
    },
    updateColumnPosition: (state, action: PayloadAction<any>) => {
      const oldColumnOrder = state.columnOrder;
      const { draggableId, destination, source } = action.payload;
      if (destination) {
        if (destination.droppableId === 'all-columns') {
          const updatedColumns = oldColumnOrder.filter(
            (data: any) => data !== draggableId
          );
          updatedColumns.splice(destination.index, 0, draggableId);
          state.columnOrder = updatedColumns;
        } else {
          const { index, droppableId } = source;
          const {
            index: destinationIndex,
            droppableId: destinationDroppableId,
          } = destination;
          const oldColumnsData = { ...state.columns };
          const proxyFilteredData: { [key: string]: any } = {};
          Object.keys(oldColumnsData).forEach((data) => {
            const processedData = { ...oldColumnsData[data] };
            const taskIds = [...processedData.taskIds];
            proxyFilteredData[data] = {
              ...processedData,
              taskIds,
            };
          });
          proxyFilteredData[destinationDroppableId].taskIds.push(draggableId);
          proxyFilteredData[droppableId].taskIds.splice(index, 1);
          state.columns = proxyFilteredData;
        }
      }
    },
    triggerDefaultNewTask: (state, action: PayloadAction<any>) => {
      state.triggerTaskCreation = action.payload.triggerTaskCreation;
    },
    createNewTaskOnEnter: (state, action: PayloadAction<any>) => {
      const { task: value, props } = action.payload;
      const { id } = props;
      const newTask = {
        id: `task-${Object.keys(state.tasks).length + 1}`,
        content: value,
        heading: true,
        progress: false,
        user: false,
        description: false,
        footer: false,
        image: false,
        type: false,
      };
      const oldTasks = { ...state.tasks };
      const proxyIterData: { [key: string]: object } = {};
      Object.keys(oldTasks).forEach((data) => {
        const processedData = { ...oldTasks[data] };
        proxyIterData[data] = {
          ...processedData,
        };
      });
      proxyIterData[`task-${Object.keys(state.tasks).length + 1}`] = newTask;
      const oldColumnsData = { ...state.columns };
      const proxyFilteredData: { [key: string]: any } = {};
      Object.keys(oldColumnsData).forEach((data) => {
        const processedData = { ...oldColumnsData[data] };
        const taskIds = [...processedData.taskIds];
        proxyFilteredData[data] = {
          ...processedData,
          taskIds,
        };
      });
      proxyFilteredData[id].taskIds.push(
        `task-${Object.keys(state.tasks).length + 1}`
      );
      state.columns = proxyFilteredData;
      state.tasks = proxyIterData;
      state.triggerTaskCreation = false;
    },
    createNewColumn: (state, action: PayloadAction<any>) => {
      const { name } = action.payload;
      const sampleData = {
        id: `column-${Object.keys(state.columns).length + 1}`,
        title: `${name}`,
        taskIds: [],
      };
      const oldColumnOrder = state.columnOrder;
      const oldColumnsData = { ...state.columns };
      const proxyFilteredData: { [key: string]: any } = {};
      Object.keys(oldColumnsData).forEach((data) => {
        const processedData = { ...oldColumnsData[data] };
        const taskIds = [...processedData.taskIds];
        proxyFilteredData[data] = {
          ...processedData,
          taskIds,
        };
      });
      proxyFilteredData[`column-${Object.keys(state.columns).length + 1}`] =
        sampleData;
      oldColumnOrder.push(`column-${Object.keys(state.columns).length + 1}`);
      state.columnOrder = oldColumnOrder;
      state.columns = proxyFilteredData;
    },
    editColumnName: (state, action: PayloadAction<any>) => {
      const { name, props } = action.payload;
      const { id } = props;
      const oldColumnsData = { ...state.columns };
      const proxyFilteredData: { [key: string]: any } = {};
      Object.keys(oldColumnsData).forEach((data) => {
        const processedData = { ...oldColumnsData[data] };
        const taskIds = [...processedData.taskIds];
        proxyFilteredData[data] = {
          ...processedData,
          taskIds,
        };
      });
      proxyFilteredData[id].title = name;
      state.columns = proxyFilteredData;
    },
    updateWholeKanbanState: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const {
  updateCardPosition,
  updateColumnPosition,
  triggerDefaultNewTask,
  createNewTaskOnEnter,
  createNewColumn,
  editColumnName,
  updateWholeKanbanState,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
