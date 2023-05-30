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
        uuid: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        childs: [],
      },
    ],
    workspaceFolders: [
      {
        name: 'Welcome Aprent',
        key: 'welcome',
        workSPaceId: 'Private',
        type: 'folder',
        uuid: '1a7aea77-2dc6-4aa2-9757-19c536e1f144',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        childOf: null,
      },
      {
        name: 'Welcome1',
        key: 'welcome1',
        workSPaceId: 'Private',
        type: 'folder',
        uuid: uuidv4(),
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        childOf: null,
      },
      {
        name: 'child',
        key: 'tested',
        workSPaceId: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        type: 'folder',
        uuid: '1a7aea77-2dc6-4aa2-9757-19c536e1f133',
        childOf: '1a7aea77-2dc6-4aa2-9757-19c536e1f144',
      },
      {
        name: 'child-test',
        key: 'tested',
        workSPaceId: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        type: 'folder',
        uuid: '1a7aea77-2dc6-4aa2-9757-19c536vb1f133',
        childOf: '1a7aea77-2dc6-4aa2-9757-19c536e1f144',
      },
      {
        name: 'Welcome',
        key: 'welcome',
        workSPaceId: 'Private',
        type: 'folder',
        uuid: 'b25bcec6-6ed7-47f5-9b9d-1673da80c860',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        childOf: null,
      },
      {
        name: 'child-test-3',
        key: 'tested',
        workSPaceId: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        type: 'folder',
        uuid: '1a7aea77-2dc6-4aa2-9757-19c536vb1x133',
        childOf: '1a7aea77-2dc6-4aa2-9757-19c536vb1f133',
      },
    ],
    workSpaceDocs: [
      {
        name: 'Welcome To Bud',
        childOf: null,
        workSPaceId: 'Private',
        type: 'doc',
        uuid: '8fbac4d2-7bd0-482f-9880-c645bddd6eac5',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
      },
      {
        name: 'Welcome To Bud',
        childOf: '1a7aea77-2dc6-4aa2-9757-19c536vb1x133',
        workSPaceId: 'Private',
        type: 'doc',
        uuid: '8fbac4d2-7bd0-482f-9880-c645b426eac5',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
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
      console.log(action.payload, 'adSD');
      const { value, index } = action.payload;
      const { workSpace } = state.currentSelectedItem;
      const workspaceItem = state.workSpaceItems.find(
        (item) => item.uuid === workSpace
      );
      const matchingItems = state.workSpaceDocs.filter(
        (item) => item.workSpaceUUID === workSpace
      );
      const matchingFolders = state.workspaceFolders.filter(
        (item) => item.workSpaceUUID === workSpace
      );
      if (workspaceItem) {
        if (value.name) {
          workspaceItem.name = value.name;
          matchingItems.forEach((item) => {
            item.workSPaceId = value.name;
          });
          matchingFolders.forEach((item) => {
            item.workSPaceId = value.name;
          });
        } else {
          workspaceItem.name = value;
          matchingItems.forEach((item) => {
            item.workSPaceId = value;
          });
          matchingFolders.forEach((item) => {
            item.workSPaceId = value;
          });
        }
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
          workSpaceUUID: workSpaceDetails.uuid,
        };
        copyFolderStructure.push(newObject);
        state.workspaceFolders = copyFolderStructure;
      }
    },
    createDoc: (state, action: PayloadAction<any>) => {
      const copyDocStructure = state.workSpaceDocs;
      const { name, workSpaceDetails } = action.payload;
      // const filteredArray = copyDocStructure.filter(
      // (data: any) => data.key === name
      // );
      // if (filteredArray.length === 0) {
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
      // }
    },
    createSubChild: (state, action: PayloadAction<any>) => {
      console.log('action.payload', action.payload);
      const { name, type, parentDetails } = action.payload;
      if (type === 'folder') {
        const copyOfworkSpaceFolders = [...state.workspaceFolders];
        const proxyFilteredArray = [];
        copyOfworkSpaceFolders.forEach((data: any) => {
          console.log({ ...data });
          proxyFilteredArray.push({ ...data });
        });
        // console.log('action.payload', copyOfworkSpaceDocs);

        const sampleDocData = {
          name,
          childOf: parentDetails.key,
          type: 'folder',
          uuid: uuidv4(),
          key: uuidv4(),
          workSpaceUUID: parentDetails.workspaceDetails.uuid,
          workSPaceId: parentDetails.workspaceDetails.uuid,
        };
        // console.log('action.payload', sampleDocData);
        proxyFilteredArray.push(sampleDocData);
        // console.log('action.payload', copyOfworkSpaceDocs);
        state.workspaceFolders = proxyFilteredArray;
      } else {
        const copyOfworkSpaceDocs = [...state.workSpaceDocs];
        const proxyFilteredArray = [];
        copyOfworkSpaceDocs.forEach((data: any) => {
          console.log({ ...data });
          proxyFilteredArray.push({ ...data });
        });
        // console.log('action.payload', copyOfworkSpaceDocs);

        const sampleDocData = {
          name,
          childOf: parentDetails.key,
          workSPaceId: parentDetails.uuid,
          type: 'doc',
          uuid: uuidv4(),
          workSpaceUUID: parentDetails.workspaceDetails.uuid,
        };
        // console.log('action.payload', sampleDocData);
        proxyFilteredArray.push(sampleDocData);
        // console.log('action.payload', copyOfworkSpaceDocs);
        state.workSpaceDocs = proxyFilteredArray;
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
          if (found.name === state.currentSelectedDocId) {
            found.name = name;
            state.currentSelectedDocId = name;
          } else {
            found.name = name;
          }
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
