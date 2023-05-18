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
      console.log('dchdjchdjchjdchdjchdj', action.payload);
      state.color = action.payload;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      console.log('cd', action.payload);
      state.workSpaceItems.push(action.payload);
      console.log('dsf', [...state.workSpaceItems]);
      // const arr = [...state.workSpaceItems]
      // console.log("Asdf" ,arr, [...state.workSpaceItems])
      // arr[0].name = "dsfsd"
      // console.log("h" ,arr[0])
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      const arr = [...state.workSpaceItems];
      arr[action.payload.index].name = action.payload.value;
    },
    duplicateWorkspaceItem: (state, action: PayloadAction<any>) => {
      console.log('cja');
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
