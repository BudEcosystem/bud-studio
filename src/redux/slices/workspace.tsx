/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    props: {},
    color: '#939AFF',
    workSpaceItems: [
      {
        name: 'Private',
        color: '#343434',
        id: 'wsp-1',
        childs: [
          {
            type: 'folder',
            title: 'Welcome To Bud',
            id: 'fld-1',
            childs: [
              {
                type: 'document',
                title: 'Welcome To Bud',
                id: 'doc-1',
              },
            ],
          },
          {
            type: 'document',
            title: 'Welcome To Bud',
          },
        ],
      },
    ],
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
      arr[action.payload.index].name = action.payload.value.name;
      arr[action.payload.index].color = action.payload.value.color;
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
