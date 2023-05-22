/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const getObj = (i) => {
  let obj = {
    key: '0',
    label: `Human Resources ${i + 1}`,
    isParent: true,
    children: [
      {
        key: '0-0',
        label: 'Employee detail',
      },
      {
        key: '0-1',
        label: 'Salary Details',
        children: [
          {
            key: '0-1-0',
            label: 'Information',
            isSecondChild: true,
          },
        ],
      },
    ],
  };
  return obj;
};

const initialState: any = {
  props: {},
  color: '#939AFF',
  workSpaceItems: [],
  workspaceFolders: [],
};
export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<any>) => {
      state.color = action.payload;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      console.log('create:', action.payload);
      if (action.payload.idx != undefined) {
        state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);

        console.log(JSON.stringify(state.workspaceFolders[action.payload.idx]));
        // state.workspaceFolders.push()
      } else {
        state.workspaceFolders.push(getObj(state.workSpaceItems.length));
      }
      state.workSpaceItems.push(action.payload);
      console.log('dsf', [...state.workSpaceItems]);
      // console.log(getObj(state.workSpaceItems.length))

      console.log([...state.workspaceFolders]);
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      console.log('cja');
      console.log('edit:', action.payload);
      const arr = [...state.workSpaceItems];
      console.log('Asdf', arr, [...state.workSpaceItems]);
      if (action.payload.value.name) {
        arr[action.payload.index].name = action.payload.value.name;
      } else {
        arr[action.payload.index].name = action.payload.value;
      }
      console.log('h', arr[0]);
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
