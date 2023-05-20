/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    props: {},
    color: '#939AFF',
    workSpaceItems: [],
  };
  return initialState;
};
export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: generateInitialState,
  reducers: {
    changeColor: (state, action: PayloadAction<any>) => {
      state.color = action.payload;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      state.workSpaceItems.push(action.payload);
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      const arr = [...state.workSpaceItems];
      arr[action.payload.index].name = action.payload.value;
    },
    duplicateWorkspaceItem: (state, action: PayloadAction<any>) => {
      state.workSpaceItems[action.payload.index] = action.payload.value;
    },
    changeWorkSpacePropereties: (state, action: PayloadAction<any>) => {
      state.props = { ...state.props, ...action.payload };
    },
    recoverWorkspacedata: (state, action: PayloadAction<any>) => {
      state.props = action.payload.props;
      state.color = action.payload.color;
      state.workSpaceItems = action.payload.workSpaceItems;
    },
  },
});

export const {
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
  duplicateWorkspaceItem,
  changeWorkSpacePropereties,
  recoverWorkspacedata,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
