/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    props: {},
    color: '#939AFF',
    currentWorkspace: null,
    currentSelectedDocId: null,
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
    workspaceFolders: [
      {
        name: 'folderName1',
        key: 'folderName1',
        workSPaceId: 'Private',
        type: 'folder',
      },
      {
        name: 'folderName2',
        key: 'folderName2',
        workSPaceId: 'Private',
        type: 'folder',
      },
    ],
    workSpaceDocs: [
      {
        name: 'DocName1',
        childOf: 'folderName1',
        workSPaceId: 'Private',
        type: 'doc',
      },
      {
        name: 'DocName2',
        childOf: 'folderName1',
        workSPaceId: 'Private',
        type: 'doc',
      },
      {
        name: 'DocName3',
        childOf: 'folderName1',
        workSPaceId: 'Private',
        type: 'doc',
      },
      {
        name: 'DocName4',
        childOf: null,
        workSPaceId: 'Private',
        type: 'doc',
      },
    ],
    applicationData: [
      //structure
      // {
      //   id: 'folderName',
      //   type: 'kanban / list',
      //   applicationSpecificicData: {},
      // },
    ],
  };
  return initialState;
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: generateInitialState,
  reducers: {
    changeColorAndSetName: (state, action: PayloadAction<any>) => {
      state.color = action.payload.color;
      state.currentWorkspace = action.payload.name;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      console.log('create:', action.payload);
      if (action.payload.idx !== undefined) {
        state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);

        console.log(JSON.stringify(state.workspaceFolders[action.payload.idx]));
        // state.workspaceFolders.push()
      } else {
        // state.workspaceFolders.push(getObj(state.workSpaceItems.length));
      }
      state.workSpaceItems.push(action.payload);
      // console.log('dsf', [...state.workSpaceItems]);
      // console.log(getObj(state.workSpaceItems.length))

      // console.log([...state.workspaceFolders]);
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
    createFolder: (state, action: PayloadAction<any>) => {
      console.log('action.payload', action.payload);
      const copyFolderStructure = state.workspaceFolders;
      const { name, workSpaceDetails } = action.payload;
      const filteredArray = copyFolderStructure.filter(
        (data: any) => data.key === name
      );
      if (filteredArray.length === 0) {
        const newObject = {
          name,
          key: name,
          workSPaceId: workSpaceDetails.name,
          type: 'folder',
        };
        copyFolderStructure.push(newObject);
        state.workspaceFolders = copyFolderStructure;
      }
    },
    createDoc: (state, action: PayloadAction<any>) => {
      console.log('action.payload', action.payload);
      const copyDocStructure = state.workSpaceDocs;
      const { name, workSpaceDetails } = action.payload;
      const filteredArray = copyDocStructure.filter(
        (data: any) => data.key === name
      );
      if (filteredArray.length === 0) {
        const newObject = {
          name,
          childOf: null,
          key: name,
          workSPaceId: workSpaceDetails.name,
          type: 'doc',
        };
        copyDocStructure.push(newObject);
        state.workSpaceDocs = copyDocStructure;
      }
    },
    createSubChild: (state, action: PayloadAction<any>) => {
      console.log('action.payload-createSubChild', action.payload);
      const { name, type, parentDetails } = action.payload;
      if (type === 'folder') {
        const newSampleFolderData = {
          name: 'folderName1',
          key: 'folderName1',
          workSPaceId: 'Private',
          type: 'folder',
        };
      } else {
        const copyOfworkSpaceDocs = state.workSpaceDocs;
        const sampleDocData = {
          name,
          childOf: parentDetails.label,
          workSPaceId: parentDetails.workSpaceName,
          type: 'doc',
        };
        copyOfworkSpaceDocs.push(sampleDocData);
        state.workSpaceDocs = copyOfworkSpaceDocs;
      }
    },
    setCurrentSelectedDocument: (state, action: PayloadAction<any>) => {
      console.log('action.payload-createSubChild', action.payload);
      state.currentSelectedDocId = action.payload.id;
    },
    setApplicationData:(state,action: PayloadAction<any>)=>{
      console.log("workspace ------------------- action",action.payload)

      // structure
      // {
      //   workSpaceId: 'id',
      //   docId:'id'
      //   type: 'kanban / list',
      //   applicationSpecificicData: {},
      // },
      let {editorData} = action.payload
      let {workSpaceId,docId,type,editorObject} = editorData
      let oldApplicationData = state.applicationData
      let filteredApplicationData = oldApplicationData.filter((data:any)=>(data.id === workSpaceId && data.type === type))
      if(filteredApplicationData.length >0 ){
        filteredApplicationData[0].applicationSpecificicData = editorObject;
      }else {
        const newObject = {
          workSpaceId: workSpaceId,
          docId:docId,
          type: 'editor',
          applicationSpecificicData: editorObject,
        }
        oldApplicationData.push(newObject)
      }
      state.applicationData = oldApplicationData
    }
  },
});

export const {
  changeColorAndSetName,
  createWorkspaces,
  editWorkspaceItem,
  duplicateWorkspaceItem,
  changeWorkSpacePropereties,
  recoverWorkspacedata,
  createFolder,
  createDoc,
  createSubChild,
  setCurrentSelectedDocument,
  setApplicationData
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
