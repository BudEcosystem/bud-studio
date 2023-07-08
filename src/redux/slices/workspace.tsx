/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import InitialState from 'interfaces/InitialState';
import { createNewEmptyDatabase } from '@/redux/slices/database';
import initialData from '@/components/Database/KanbanNew/data/initial-data';
import { useSelector } from 'react-redux';

export const generateInitialWorkspaceState = (): InitialState => {
  const initialState: InitialState = {
    props: {},
    color: '#939AFF',
    currentWorkspace: null,
    currentSelectedDocId: '', // Current Document
    currentSelectedItem: {
      workSpace: null,
      doc: null,
    },
    workSpaceItems: [
      {
        name: 'Private',
        color: '#939AFF',
        id: 'wsp-1',
        uuid: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        childs: [],
        files: [
          {
            id: '39b08a3d-12f1-4651-90f7-328952849dca',
            name: 'Welcome to Bud',
            files: [],
            workspaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
          },
        ],
        folders: [],
      },
    ],
    workspaceFolders: [],
    workSpaceDocs: [
      {
        name: 'Welcome To Bud',
        childOf: null,
        workSPaceId: 'Private',
        type: 'doc',
        uuid: '39b08a3d-12f1-4651-90f7-328952849dca',
        workSpaceUUID: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdcc',
        customProperties: [
          {
            title: 'Author',
            value: 'Bud',
            type: 'text',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdcc',
            order: 4,
          },
          {
            title: 'ISBN',
            value: 'QWDE-DJJC-1234',
            type: 'text',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdee',
            order: 5,
          },
        ], // User defined Properties
        properties: [
          {
            title: 'Tags',
            value: ['no-tag'],
            type: 'tags',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdc1',
            order: 1,
          },
          {
            title: 'Priority',
            value: 'Normal',
            type: 'priority',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdc2',
            order: 2,
          },
          {
            title: 'Status',
            value: 'in_progress',
            type: 'status',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdc3',
            order: 3,
          },
        ],
        // System Defined Properties
        // {
        //   tags: ['no-tag'],
        //   priority: 'Normal',
        //   status: 'Not Started',
        //   date: null,
        // },
      },
    ],
    applicationData: {
      '39b08a3d-12f1-4651-90f7-328952849dca': [
        {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'How to evolve into a super human with your',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'digital mind place',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
              },
              {
                children: [],
                direction: null,
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Philosophy, life, misc',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        {
          type: 'Database',
          databaseID: '39b08a3d-12f1-4651-90f7-3289524fr4gr',
        },
        {
          type: 'Database',
          databaseID: '39b08a3d-12f1-4651-90f7-3289524fr4gg',
        },
        {
          type: 'Database',
          databaseID: '39b08a3d-12f1-4651-90f7-3289524fr4g2',
        },
      ],
    },
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
  extraReducers: (builder) => {
    builder.addCase(createNewEmptyDatabase, (state, action) => {
      // console.log('Triggered');
      // console.log(action);

      const copyDocStructure = state.workSpaceDocs;
      copyDocStructure.push(action.payload.databaseDocumentInfo);

      // Update Application Data
      const tempAppData = state.applicationData;
      // @ts-ignore
      tempAppData[action.payload.initialDocumentID] =
        action.payload.initialDocument;

      state.applicationData = tempAppData;

      // Add New Entry
      const currentWorkspace = state.currentSelectedDocId;

      // const currentEditor = state.workSpaceDocs.find(
      //   (data: any) => data.uuid === currentWorkspace
      // );

      const documentTemplate = state.applicationData;
      documentTemplate[currentWorkspace].push({
        type: 'Database',
        databaseID: action.payload.databaseID,
      });
    });
  },
  reducers: {
    addEmptyDoc: (state, action: PayloadAction<any>) => {
      const copyDocStructure = state.workSpaceDocs;
      copyDocStructure.push(action.payload.newDatabaseDocument);

      // Update Application Data
      const tempAppData = state.applicationData;
      tempAppData[action.payload.initialDocumentID] =
        action.payload.initialDocument;

      state.applicationData = tempAppData;
      state.workSpaceDocs = copyDocStructure;

      // copyDocStructure.push(action.payload);
      // state.workSpaceDocs = copyDocStructure;
    },
    changeColorAndSetName: (state, action: PayloadAction<any>) => {
      state.color = action.payload.color;
      state.currentWorkspace = action.payload.uuid;
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
      state.workspaceFolders.push(action.payload.newFileForWorkspaceFolder);
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          item.folders.push(action.payload.newFolder);
        }
        console.log({ ...item.folders });
      });
    },
    addFileRedux: (state, action: PayloadAction<any>) => {
      state.workSpaceDocs.push(action.payload.newFileForWorkspaceDocs);
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          item['files'].push(action.payload.newFile);
          state.applicationData[action.payload.newFile.id] = [
            {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: `${action.payload.newFile.name}`,
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h1',
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h1',
                  },
                  {
                    children: [],
                    direction: null,
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Philosophy, life, misc, ',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'root',
                version: 1,
              },
            },
          ];
          // setApplicationData({
          //   workSpaceId: action.payload.workspaceUUID,
          //   docId: action.payload.newFile.id,
          //   type: 'editor',
          //   editorObject: '',
          // });
        }
        console.log({ ...item.files });
      });
    },
    addSubFoldersRedux: (state, action: PayloadAction<any>) => {
      state.workspaceFolders.push(action.payload.newFileForWorkspaceFolder);
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
      console.log(action.payload.newFileForWorkspaceDocs, 'safd');
      state.workSpaceDocs.push(action.payload.newFileForWorkspaceDocs);
      state.workSpaceItems.map((item, i) => {
        if (item.uuid === action.payload.workspaceUUID) {
          const x = searchById(item.folders, action.payload.subFileId);
          if (x) {
            x.files.push(action.payload.newFile);
            state.applicationData[action.payload.newFile.id] = [
              {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: `${action.payload.newFile.name}`,
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'heading',
                      version: 1,
                      tag: 'h1',
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: '',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'heading',
                      version: 1,
                      tag: 'h1',
                    },
                    {
                      children: [],
                      direction: null,
                      format: '',
                      indent: 0,
                      type: 'paragraph',
                      version: 1,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Philosophy, life, misc, ',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'paragraph',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'root',
                  version: 1,
                },
              },
            ];
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

      // Create ApplicationData
      const copyApp: any = state.applicationData;

      copyApp[newObject.uuid] = [
        {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: newObject.name,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'heading',
                version: 1,
                tag: 'h1',
              },
              {
                children: [],
                direction: null,
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
      ];

      state.applicationData = copyApp;
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
    updateDocumentData: (state, action: PayloadAction<any>) => {
      const { editorState, currentPage, currentDocumentUUID } = action.payload;

      const copyOfApplicationData = state.applicationData;

      console.log(JSON.stringify(editorState));

      copyOfApplicationData[currentDocumentUUID][currentPage] = JSON.parse(
        JSON.stringify(editorState)
      );

      state.applicationData = copyOfApplicationData;

      // copyOfApplicationData.forEach(element => {
      //   console
      // });

      // console.log(
      //   'Application Status',
      //   copyOfApplicationData
      // );
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
      const sourceData = proxyFilteredArray.find(
        (data: any) => data.uuid === source.key
      );
      const copyOfSource = JSON.parse(JSON.stringify(sourceData));
      copyOfSource.childOf = dest.uuid;
      copyOfSource.workSPaceId = dest.workSPaceId;
      copyOfSource.workSpaceUUID = dest.workSpaceUUID;
      console.log(copyOfSource, sourceData);
      // {
      //   if (data.uuid === source.key) {
      //     data.childOf = dest.uuid;
      //     data.workSPaceId = dest.workSPaceId;
      //     data.workSpaceUUID = dest.workSpaceUUID;
      //   }
      //   return data;
      // });
      proxyFilteredArray.push(copyOfSource);
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
    attachDatabaseToDocument: (state, action: PayloadAction<any>) => {
      console.log('attachDatabaseToDocument', action.payload);

      const { docId, databaseId } = action.payload;
      // const copyOfworkSpaceDocs = [...state.workSpaceDocs];
      // const proxyFilteredArray: any = [];
      // copyOfworkSpaceDocs.forEach((data: any) => {
      //   proxyFilteredArray.push({ ...data });
      // });

      // console.log("proxyFilteredArray",proxyFilteredArray);

      // const newSetOFDataProcessed = proxyFilteredArray.map((data: any) => {
      //   if (data.uuid === docId) {
      //     data.databaseId = databaseId;
      //   }
      //   return data;
      // });
      //
      // state.workSpaceDocs = newSetOFDataProcessed;

      // const { docId, databaseId } = action.payload;
      // const copyOfworkSpaceDocs = [...state.workSpaceDocs];
      // const proxyFilteredArray: any = [];
      // copyOfworkSpaceDocs.forEach((data: any) => {
      //   proxyFilteredArray.push({ ...data });
      // });
      // const newSetOFDataProcessed = proxyFilteredArray.map((data: any) => {
      //   if (data.uuid === docId) {
      //     data.databaseId = databaseId;
      //   }
      //   return data;
      // });
      // state.workSpaceDocs = newSetOFDataProcessed;
    },
    changeKanbanStatusForWorkSpaceDocs: (state, action: PayloadAction<any>) => {
      const { dragResult } = action.payload;
      const copyOfWorkSpaceDocs = [...state.workSpaceDocs];
      const proxyFilteredArray: any = [];
      copyOfWorkSpaceDocs.forEach((data: any) => {
        const proxyOfcustomProperties: any = [];
        data.customProperties.forEach((props: any) => {
          proxyOfcustomProperties.push({ ...props });
        });
        const proxyOfProperties: any = [];
        data.properties.forEach((props: any) => {
          proxyOfProperties.push({ ...props });
        });
        const newProxyOfProperties = proxyOfProperties.map(
          (properties: any) => {
            if (properties.type === 'status') {
              properties.value = dragResult.destination.droppableId;
            }
            return properties;
          }
        );
        proxyFilteredArray.push({
          ...data,
          properties: newProxyOfProperties,
          customProperties: proxyOfcustomProperties,
        });
      });
      console.log(proxyFilteredArray);
      state.workSpaceDocs = proxyFilteredArray;
    },
    addNewWorkSpaceDocument: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      let { docId, statusKey, workspaceId } = action.payload;
      let newWorkSpaceDocObject = {
        name: 'Welcome To Bud',
        childOf: null,
        workSPaceId: 'Private',
        type: 'doc',
        uuid: docId,
        workSpaceUUID: workspaceId,
        customProperties: [
          {
            title: 'Author',
            value: 'Bud',
            type: 'text',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdcc',
            order: 4,
          },
          {
            title: 'ISBN',
            value: 'QWDE-DJJC-1234',
            type: 'text',
            id: '3717e4c0-6b5e-40f2-abfc-bfa4f22fcdee',
            order: 5,
          },
        ], // User defined Properties
        properties: [
          {
            title: 'Tags',
            value: ['no-tag'],
            type: 'tags',
            id: uuidv4(),
            order: 1,
          },
          {
            title: 'Priority',
            value: 'Normal',
            type: 'priority',
            id: uuidv4(),
            order: 2,
          },
          {
            title: 'Status',
            value: statusKey,
            type: 'status',
            id: uuidv4(),
            order: 3,
          },
        ],
      };
    },

    createTableDocument: (state, action: PayloadAction<any>) => {
      console.log('test');
      console.log(action.payload);

      // Setup Workspace Meta
      const workspaceDocs = state.workSpaceDocs;
      workspaceDocs.push(action.payload.documentMeta);
      state.workSpaceDocs = workspaceDocs;

      // Update The Application Data
      const appData: any = state.applicationData;
      appData[action.payload.initialDocumentID] = action.payload.docTemplate;
      console.log('App Data', appData);
      state.applicationData = appData;
    },
    changePriority: (state, action: PayloadAction<any>) => {
      const copyOfworkSpaceDocs = state.workSpaceDocs;
      copyOfworkSpaceDocs.map((doc, index) => {
        if (doc.uuid == action.payload.id) {
          console.log(
            'REDUXGOV',
            state.workSpaceDocs[index].properties[1].value
          );
          state.workSpaceDocs[index].properties[1].value = action.payload.label;
        }
      });
    },
    changeStatus: (state, action: PayloadAction<any>) => {
      console.log('LABEL', action.payload.label);
      const copyOfworkSpaceDocs = state.workSpaceDocs;
      copyOfworkSpaceDocs.map((doc, index) => {
        if (doc.uuid == action.payload.id) {
          state.workSpaceDocs[index].properties[2].value = action.payload.label;
        }
      });
    },
  },
});

export const {
  addEmptyDoc,
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
  updateDocumentData,
  attachDatabaseToDocument,
  changeKanbanStatusForWorkSpaceDocs,
  addNewWorkSpaceDocument,
  createTableDocument,
  changePriority,
  changeStatus,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
