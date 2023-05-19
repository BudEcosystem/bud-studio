import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const getObj = (i) => {
  let obj = {
    key: '0',
    label: `Human Resources ${i+1}`,
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
  }
   return obj
}

const initialState: any = {
  props: {},
  color: '#939AFF',
  workSpaceItems: [],
  workspaceFolders: [],
};
export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<any>) => {
      console.log('dchdjchdjchjdchdjchdj', action.payload);
      state.color = action.payload;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      console.log('cd', action.payload);
      if(action.payload.idx != undefined) {
        state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);
  
          console.log(JSON.stringify(state.workspaceFolders[action.payload.idx]))
          // state.workspaceFolders.push()
        }
        else{
        state.workspaceFolders.push(getObj(state.workSpaceItems.length));

        }
      state.workSpaceItems.push(action.payload);
      console.log('dsf', [...state.workSpaceItems]);
      // console.log(getObj(state.workSpaceItems.length))
      
      console.log([...state.workspaceFolders])
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      console.log('cja');
      console.log('cd', action.payload);
      const arr = [...state.workSpaceItems];
      console.log('Asdf', arr, [...state.workSpaceItems]);
      arr[action.payload.index].name = action.payload.value;
      console.log('h', arr[0]);
    },
    // duplicateWorkspaceItem: (state, action: PayloadAction<any>) => {
    //     console.log("cja")
    //     state.workSpaceItems[action.payload.index] = action.payload.value
    // },
    changeWorkSpacePropereties: (state, action: PayloadAction<any>) => {
      state.props = { ...state.props, ...action.payload };
    },
  },
});

export const {
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
  duplicateWorkspaceItem,
  changeWorkSpacePropereties,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
