/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

//temp private workspace id
const wrkUUID = uuidv4();
const generateInitialState = (): any => {
  const initialState: any = {
    props: {},
    color: '#939AFF',
    currentWorkspace: null,
    currentSelectedDocId: null,
    currentSelectedItem: {
      workSpace: null,
      doc: null,
    },
    workSpaceItems: [
      {
        name: 'Private',
        color: '#343434',
        id: 'wsp-1',
        uuid: wrkUUID,
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
        name: 'Welcome',
        key: 'welcome',
        workSPaceId: 'Private',
        type: 'folder',
        uuid: uuidv4(),
        workSpaceUUID: wrkUUID,
      },
    ],
    workSpaceDocs: [
      {
        name: 'Welcome To Bud',
        childOf: 'welcome',
        workSPaceId: 'Private',
        type: 'doc',
        uuid: uuidv4(),
        workSpaceUUID: wrkUUID,
      },
    ],
    applicationData: [],
    editorInitialised: false,
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
      state.editorInitialised = false;
      state.currentSelectedDocId = null;
    },
    changeColor: (state, action: PayloadAction<any>) => {
      state.color = action.payload.color;
    },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      if (action.payload.idx !== undefined) {
        state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);
        // state.workspaceFolders.push()
      } else {
        // state.workspaceFolders.push(getObj(state.workSpaceItems.length));
      }
      state.workSpaceItems.push({ ...action.payload, uuid: uuidv4() });
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      const arr = [...state.workSpaceItems];
      if (action.payload.value.name) {
        arr[action.payload.index].name = action.payload.value.name;
      } else {
        arr[action.payload.index].name = action.payload.value;
      }
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
          uuid: uuidv4(),
        };
        copyFolderStructure.push(newObject);
        state.workspaceFolders = copyFolderStructure;
      }
    },
    createDoc: (state, action: PayloadAction<any>) => {
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
          uuid: uuidv4(),
          workSpaceUUID: workSpaceDetails.uuid,
        };
        copyDocStructure.push(newObject);
        state.workSpaceDocs = copyDocStructure;
      }
    },
    createSubChild: (state, action: PayloadAction<any>) => {
      const { name, type, parentDetails } = action.payload;
      console.log(parentDetails);
      if (type === 'folder') {
        const newSampleFolderData = {
          name: 'folderName1',
          key: 'folderName1',
          workSPaceId: 'Private',
          type: 'folder',
          uuid: uuidv4(),
        };
      } else {
        const copyOfworkSpaceDocs = state.workSpaceDocs;
        const sampleDocData = {
          name,
          childOf: parentDetails.label,
          workSPaceId: parentDetails.workSpaceName,
          type: 'doc',
          uuid: uuidv4(),
          workSpaceUUID: parentDetails.workSpaceUUID,
        };
        copyOfworkSpaceDocs.push(sampleDocData);
        state.workSpaceDocs = copyOfworkSpaceDocs;
      }
    },
    setCurrentSelectedDocument: (state, action: PayloadAction<any>) => {
      let { uuid: docUUID, workSpaceUUID } = action.payload;
      if (!workSpaceUUID) {
        const found = state.workSpaceDocs.find((x) => x.uuid === docUUID);
        if (found) {
          workSpaceUUID = found?.workSpaceUUID;
        }
      }
      state.currentSelectedItem.doc = docUUID;
      state.currentSelectedItem.workSpace = workSpaceUUID;
      state.currentSelectedDocId = action.payload.id;
      state.editorInitialised = false;
    },
    setApplicationData: (state, action: PayloadAction<any>) => {
      const { workSpaceId, docId, editorObject } = action.payload;
      const oldApplicationData: any = [];
      const { applicationData } = state;
      applicationData.forEach((data: any) => {
        oldApplicationData.push({ ...data });
      });
      const filteredApplicationData = oldApplicationData.filter(
        (data: any) => data.workSpaceId === workSpaceId && data.docId === docId
      );
      if (filteredApplicationData.length > 0) {
        filteredApplicationData[0].applicationSpecificicData = editorObject;
      } else {
        const newObject = {
          workSpaceId,
          docId,
          type: 'editor',
          applicationSpecificicData: editorObject,
        };
        oldApplicationData.push(newObject);
      }
      state.applicationData = oldApplicationData;
    },
    setEditorInitialised: (state) => {
      state.editorInitialised = true;
    },
    renameItem: (state, action) => {
      const { isFolder, uuid, name } = action.payload;
      const rename = (list: any[], id: string) => {
        const found = list.find((f) => f.uuid === id);
        if (found) {
          found.name = name;
        }
      };
      if (isFolder) {
        rename(state.workspaceFolders, uuid);
      } else {
        rename(state.workSpaceDocs, uuid);
      }
    },
    deleteItem: (state, action) => {
      const { isFolder, uuid } = action.payload;
      const deleteNode = (list: any[], id: string) => {
        const foundIndex = list.findIndex((f) => f.uuid === id);
        if (foundIndex !== -1) {
          list.splice(foundIndex, 1);
        }
      };
      if (isFolder) {
        deleteNode(state.workspaceFolders, uuid);
      } else {
        deleteNode(state.workSpaceDocs, uuid);
      }
    },
  },
});

export const {
  changeColorAndSetName,
  createWorkspaces,
  editWorkspaceItem,
  duplicateWorkspaceItem,
  changeColor,
  changeWorkSpacePropereties,
  recoverWorkspacedata,
  createFolder,
  createDoc,
  createSubChild,
  setCurrentSelectedDocument,
  setApplicationData,
  setEditorInitialised,
  renameItem,
  deleteItem,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
