/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
const DBName = 'budelectron';
const DBVersion = 1;
const DBRequest = idb.open(DBName, DBVersion);
const generateInitialState = (): any => {
  // const dbInstance = DBRequest.result;
  // const transaction = dbInstance.transaction('budstore', 'readwrite');
  // const indexeddbStore = transaction.objectStore('budstore');
  // const requestForCheckIfExists = indexeddbStore.get('123');
  // requestForCheckIfExists.onSuccess = (event) => {
  //   console.log('workspaceslice', event);
  // };
  const initialState: any = {
    props: {},
    color: '#939AFF',
    workSpaceItems: [],
  };
  return initialState;
};
// const initialState: any = {
//   props: {},
//   color: '#939AFF',
//   workSpaceItems: [],
// };
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
    // duplicateWorkspaceItem: (state, action: PayloadAction<any>) => {
    //     console.log("cja")
    //     state.workSpaceItems[action.payload.index] = action.payload.value
    // },
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
