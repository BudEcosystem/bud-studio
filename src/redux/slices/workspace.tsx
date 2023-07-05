/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import InitialState from 'interfaces/InitialState';

export const generateInitialWorkspaceState = (): InitialState => {
  const initialState: InitialState = {
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
        files: [
          {
            id: uuidv4(),
            name: 'Main File 1',
            files: [],
          },
          {
            id: uuidv4(),
            name: 'Main File 2',
            files: [],
          },
        ],
        folders: [
          {
            id: uuidv4(),
            name: 'People Ops',
            folders: [
              {
                id: uuidv4(),
                name: 'Subfolder 1',
                files: [],
                folders: [],
              },
            ],
            files: [],
          },
          {
            id: uuidv4(),
            name: 'HR',
            folders: [
              {
                id: uuidv4(),
                name: 'Subfolder 3',
                files: [],
                folders: [],
              },
            ],
            files: [
              {
                id: uuidv4(),
                name: 'Subfolder 3',
                files: [],
              },
            ],
          },
        ],
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
        properties: [],
      },
    ],
    applicationData: [],
    editorInitialised: false,
    editorApplicationsAdded: [],
  };
  return initialState;
};

const searchById = (structure, id) => {
  if (!structure || structure.length === 0) {
    return null;
  }
  for (const item of structure) {
    if (item.id === id) {
      return item;
    }
    if (item.folders && item.folders.length > 0) {
      const foundInFolders = searchById(item.folders, id);
      if (foundInFolders) {
        return foundInFolders;
      }
    }
    // if (item.files && item.files.length > 0) {
    //   const foundInFiles = searchById(item.files, id);
    //   if (foundInFiles) {
    //     return foundInFiles;
    //   }
    // }
  }
  return null;
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: generateInitialWorkspaceState,
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
    // createWorkspaces: (state, action: PayloadAction<any>) => {
    //   if (action.payload.idx !== undefined) {
    //     state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);
    //     // state.workspaceFolders.push()
    //   } else {
    //     // state.workspaceFolders.push(getObj(state.workSpaceItems.length));
    //   }
    //   state.workSpaceItems.push({ ...action.payload, uuid: uuidv4() });
    // },
    createWorkspaces: (state, action: PayloadAction<any>) => {
      if (action.payload.idx !== undefined) {
        state.workspaceFolders.push(state.workspaceFolders[action.payload.idx]);
        // state.workspaceFolders.push()
      } else {
        // state.workspaceFolders.push(getObj(state.workSpaceItems.length));
      }
      state.workSpaceItems.push({
        ...action.payload,
        uuid: uuidv4(),
        files: [],
        folders: [],
      });
    },
    addFolderRedux: (state, action: PayloadAction<any>) => {
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          item['folders'].push(action.payload.newFolder);
        }
        console.log({ ...item.folders });
      });
    },
    addFileRedux: (state, action: PayloadAction<any>) => {
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          item['files'].push(action.payload.newFile);
        }
        console.log({ ...item.files });
      });
    },
    addSubFoldersRedux: (state, action: PayloadAction<any>) => {
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          const x = searchById(item.folders, action.payload.subFolderId);
          if (x) {
            x.folders.push(action.payload.newFolder);
          }
        }
      });
    },
    addSubFilesRedux: (state, action: PayloadAction<any>) => {
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          const x = searchById(item.folders, action.payload.subFileId);
          if (x) {
            x.files.push(action.payload.newFile);
          }
        }
      });
    },
    editWorkspaceItem: (state, action: PayloadAction<any>) => {
      const arr = [...state.workSpaceItems];
      console.log(JSON.stringify(arr));
      if (action.payload.editColor) {
        arr[action.payload.index].name = action.payload.value.name;
        arr[action.payload.index].color = action.payload.value.color;
      } else if (action.payload.value.name) {
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
      const { name: passedName, workSpaceDetails } = action.payload;
      let name = passedName;
      const filteredUnknown = copyFolderStructure.filter(
        (data: any) =>
          data.name.includes(name) &&
          data.childOf === null &&
          data.workSpaceUUID === workSpaceDetails.uuid
      );
      if (name === 'Untitled') {
        name = `${name}-${filteredUnknown.length + 1}`;
      }
      const newObject = {
        name,
        key: name,
        workSPaceId: workSpaceDetails.uuid,
        workSpaceUUID: workSpaceDetails.uuid,
        type: 'folder',
        uuid: uuidv4(),
        childOf: null,
      };
      copyFolderStructure.push(newObject);
      state.workspaceFolders = copyFolderStructure;
      // }
    },
    createDoc: (state, action: PayloadAction<any>) => {
      const copyDocStructure = state.workSpaceDocs;
      const { name: passedName, workSpaceDetails } = action.payload;
      let name = passedName;
      const filteredUnknown = copyDocStructure.filter(
        (data: any) =>
          data.name.includes(name) &&
          data.childOf === null &&
          data.workSpaceUUID === workSpaceDetails.uuid
      );
      if (name === 'Untitled') {
        name = `${name}-${filteredUnknown.length + 1}`;
      }
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
      const { name: passedName, type, parentDetails } = action.payload;
      let name = passedName;
      if (type === 'folder') {
        const copyOfworkSpaceFolders = [...state.workspaceFolders];
        const proxyFilteredArray: any = [];
        copyOfworkSpaceFolders.forEach((data: any) => {
          proxyFilteredArray.push({ ...data });
        });
        const filteredUnknown = proxyFilteredArray.filter(
          (data: any) =>
            data.name.includes(name) &&
            data.childOf === parentDetails.key &&
            data.workSpaceUUID === parentDetails.workspaceDetails.uuid
        );
        if (name === 'Untitled') {
          name = `${name}-${filteredUnknown.length + 1}`;
        }
        const sampleDocData = {
          name,
          childOf: parentDetails.key,
          type: 'folder',
          uuid: uuidv4(),
          key: uuidv4(),
          workSpaceUUID: parentDetails.workspaceDetails.uuid,
          workSPaceId: parentDetails.workspaceDetails.uuid,
        };
        proxyFilteredArray.push(sampleDocData);
        state.workspaceFolders = proxyFilteredArray;
      } else {
        const copyOfworkSpaceDocs = [...state.workSpaceDocs];
        const proxyFilteredArray: any = [];
        copyOfworkSpaceDocs.forEach((data: any) => {
          proxyFilteredArray.push({ ...data });
        });
        const filteredUnknown = proxyFilteredArray.filter(
          (data: any) =>
            data.name.includes(name) &&
            data.childOf === parentDetails.key &&
            data.workSpaceUUID === parentDetails.workspaceDetails.uuid
        );
        if (name === 'Untitled') {
          name = `${name}-${filteredUnknown.length + 1}`;
        }
        const sampleDocData = {
          name,
          childOf: parentDetails.key,
          workSPaceId: parentDetails.uuid,
          type: 'doc',
          uuid: uuidv4(),
          workSpaceUUID: parentDetails.workspaceDetails.uuid,
        };
        proxyFilteredArray.push(sampleDocData);
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
      // state.currentSelectedItem.doc = docUUID;
      // state.currentSelectedItem.workSpace = workSpaceUUID;
      state.currentSelectedDocId = docUUID;
      state.currentWorkspace = workSpaceUUID;
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
    duplicateFolder: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      const copyFolderStructure = state.workspaceFolders;
      const folderFound = copyFolderStructure.find(
        (data: any) => data.uuid === id
      );
      if (folderFound) {
        console.log('folderFound', folderFound);
      }
    },
    deleteFolder: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      const copyFolderStructure = state.workspaceFolders;
      const filteredFolders = copyFolderStructure.filter(
        (data: any) => data.uuid !== id
      );
      state.workspaceFolders = filteredFolders;
    },
    addWorkSpaceApplications: (state, action: PayloadAction<any>) => {
      const { workspace, type, titleGenerated, newId } = action.payload;
      const { currentSelectedDocId: currentSelectedDoc } = workspace;
      const newApplicationObject = {
        title: titleGenerated,
        docId: currentSelectedDoc,
        type,
        applicatioId: newId,
        createdAt: dayjs().unix(),
        appData: null,
        titleForDoc: 'Default Title',
      };
      const oldApplicationData: any = [];
      const { editorApplicationsAdded: applicationData } = state;
      applicationData.forEach((data: any) => {
        oldApplicationData.push({ ...data });
      });
      oldApplicationData.push(newApplicationObject);
      state.editorApplicationsAdded = oldApplicationData;
    },
    updateWholeState: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    updateAppData: (state, action: PayloadAction<any>) => {
      const { appID, appData } = action.payload;
      console.log(action.payload);
      const copyOfEditorApplicationsAdded = [...state.editorApplicationsAdded];
      const proxyFilteredArray: any = [];
      copyOfEditorApplicationsAdded.forEach((data): any => {
        let currentData = { ...data };
        if (currentData.applicatioId === appID) {
          currentData = { ...currentData, appData };
        }
        proxyFilteredArray.push({ ...currentData });
      });
      console.log('copyOfEditorApplicationsAdded', proxyFilteredArray);
      state.editorApplicationsAdded = proxyFilteredArray;
    },
    editFolderName: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      const { id, name } = action.payload;
      const copyOfworkSpaceFolders = [...state.workspaceFolders];
      const proxyFilteredArray: any = [];
      copyOfworkSpaceFolders.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const newSetOFDataProcessed = proxyFilteredArray.map((data: any) => {
        if (data.uuid === id) {
          data.name = name;
        }
        return data;
      });
      state.workspaceFolders = newSetOFDataProcessed;
    },
    moveFolderRedux: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'move123');
      const { dest, source } = action.payload;
      const copyOfworkSpaceFolders = [...state.workspaceFolders];
      const proxyFilteredArray: any = [];
      copyOfworkSpaceFolders.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const newSetOFDataProcessed = proxyFilteredArray.map((data: any) => {
        if (data.uuid === source.key) {
          data.childOf = dest.uuid;
          data.workSPaceId = dest.workSPaceId;
          data.workSpaceUUID = dest.workSpaceUUID;
        }
        return data;
      });
      state.workspaceFolders = newSetOFDataProcessed;
    },
    copyFolderRedux: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'copy123');
      const { dest, source } = action.payload;
      const copyOfworkSpaceFolders = [...state.workspaceFolders];
      const proxyFilteredArray: any = [];
      copyOfworkSpaceFolders.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const sourceData = proxyFilteredArray.find((data: any) => data.uuid === source.key)
      const copyOfSource = JSON.parse(JSON.stringify(sourceData));
      copyOfSource.childOf = dest.uuid
      copyOfSource.workSPaceId = dest.workSPaceId;
      copyOfSource.workSpaceUUID = dest.workSpaceUUID;
      console.log(copyOfSource, sourceData)
      // {
      //   if (data.uuid === source.key) {
      //     data.childOf = dest.uuid;
      //     data.workSPaceId = dest.workSPaceId;
      //     data.workSpaceUUID = dest.workSpaceUUID;
      //   }
      //   return data;
      // });
      proxyFilteredArray.push(copyOfSource)
      state.workspaceFolders = proxyFilteredArray;
    },

    addDuplicateFolders: (state, action: PayloadAction<any>) => {
      console.log(
        'duplicateFolder - addDuplicateFolders - payload',
        action.payload
      );
      const copyFolderStructure = state.workspaceFolders;
      const { newObjectArray } = action.payload;
      const proxyFilteredArray: any = [];
      copyFolderStructure.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const newArrayGenerated = proxyFilteredArray.concat(newObjectArray);
      console.log('duplicateFolder - addDuplicateFolders', newArrayGenerated);
      state.workspaceFolders = newArrayGenerated;
    },
    addDuplicateDoc: (state, action: PayloadAction<any>) => {
      console.log(
        'duplicateFolder - addDuplicateDoc - payload',
        action.payload
      );
      const copyDocStructure = state.workSpaceDocs;
      const { newObjectArray } = action.payload;
      const proxyFilteredArray: any = [];
      copyDocStructure.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      // proxyFilteredArray = [...proxyFilteredArray, ...newObjectArray];
      copyDocStructure.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const newArrayGenerated = proxyFilteredArray.concat(newObjectArray);
      console.log('duplicateFolder - addDuplicateDoc', newArrayGenerated);
      state.workSpaceDocs = newArrayGenerated;
      // }
    },
    addDuplicateEditorApplications: (state, action: PayloadAction<any>) => {
      console.log(
        'duplicateFolder - addDuplicateDoc - payload',
        action.payload
      );
      const copyDocStructure = state.editorApplicationsAdded;
      const { newObjectArray } = action.payload;
      const proxyFilteredArray: any = [];
      copyDocStructure.forEach((data: any) => {
        proxyFilteredArray.push({ ...data });
      });
      const newArrayGenerated = proxyFilteredArray.concat(newObjectArray);
      console.log('duplicateFolder - addDuplicateDoc', newArrayGenerated);
      state.editorApplicationsAdded = newArrayGenerated;
      // }
    },
    updateAppName: (state, action: PayloadAction<any>) => {
      console.log('applicationsDataFiltered', action.payload);
      const { appID, titleForDoc } = action.payload;
      console.log(action.payload);
      const copyOfEditorApplicationsAdded = [...state.editorApplicationsAdded];
      const proxyFilteredArray: any = [];
      copyOfEditorApplicationsAdded.forEach((data): any => {
        let currentData = { ...data };
        if (currentData.applicatioId === appID) {
          currentData = { ...currentData, titleForDoc };
        }
        proxyFilteredArray.push({ ...currentData });
      });
      console.log('copyOfEditorApplicationsAdded', proxyFilteredArray);
      state.editorApplicationsAdded = proxyFilteredArray;
    },
  },
});

export const {
  changeColorAndSetName,
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
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
  duplicateFolder,
  deleteFolder,
  addWorkSpaceApplications,
  updateWholeState,
  updateAppData,
  editFolderName,
  addDuplicateFolders,
  addDuplicateDoc,
  addDuplicateEditorApplications,
  updateAppName,
  addFolderRedux,
  addFileRedux,
  addSubFoldersRedux,
  addSubFilesRedux,
  moveFolderRedux,
  copyFolderRedux,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
