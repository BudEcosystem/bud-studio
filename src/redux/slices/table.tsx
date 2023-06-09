/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';

export const generateInitialTableState = (): any => {
  const columnsArray = [
    {
      Header: '#',
      accessor: (row, index) => index + 1,
    },
    {
      Header: 'Account Name',
      accessor: 'account_name',
    },
    {
      Header: 'Account ID',
      accessor: 'account_id',
    },
    {
      Header: 'Annual Revenue',
      accessor: 'annual_revenue',
    },
    {
      Header: 'Score',
      accessor: 'score',
    },
    {
      Header: 'Due Date',
      accessor: 'due_date',
    },
    {
      Header: 'Assignee',
      accessor: 'assignee',
      Cell: ({ value }) => <CircularImageComponent />,
    },
    {
      Header: 'Priority',
      accessor: 'priority',
    },
    {
      Header: 'Tag',
      accessor: 'tag',
    },
  ];
  const newTaskClickedtable = false;
  const addNewRow = false;
  const initialData = {
    newTaskClickedtable,
    columnsArray,
    addNewRow,
  };
  return initialData;
};

export const tableSlice = createSlice({
  name: 'table',
  initialState: generateInitialTableState(),
  reducers: {
    setNewTaskClickedtable: (state, action: PayloadAction<any>) => {
      state.newTaskClickedtable = action.payload;
    },
    setNewColumn: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.columnsArray.push(action.payload);
    },
    setColumnOrder: (state, action: PayloadAction<any>) => {
      const { source, destination } = action.payload;
      if (!destination) return;
      const newColumnOrder = Array.from(state.columnsArray);
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);
      state.columnsArray = newColumnOrder;
    },
  },
});
export const { setNewTaskClickedtable, setNewColumn, setColumnOrder } =
  tableSlice.actions;
export default tableSlice.reducer;
