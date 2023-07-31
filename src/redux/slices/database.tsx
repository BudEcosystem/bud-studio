/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// uuid
import { v4 as uuidv4 } from 'uuid';

import { addEmptyDoc } from './workspace';

export const generateDatabaseInitialState = (): any => {
  const initialState = {
    databases: [
      {
        type: 'Database',
        id: '39b08a3d-12f1-4651-90f7-3289524fr4gr',
        title: 'Bud Test Database Table',
        description: 'This is a test database',
        defaultView: 'Table',
        created_at: '',
        updated_at: '',
        propertyPresets: {
          date: {
            name: 'Date',
            type: 'date',
          },
          priority: {
            name: 'Priority',
            type: 'select',
            options: [
              { title: 'High', color: '#fff' },
              { title: 'Low', color: '#fff' },
              { title: 'Medium', color: '#fff' },
              { title: 'Normal', color: '#fff' },
            ],
          },
          status: {
            name: 'Status',
            type: 'select',
            options: [
              {
                title: 'Not Started',
                key: 'Not Started',
                color: 'red',
                key: 'not_started',
              },
              {
                title: 'In Progress',
                key: 'In Progress',
                color: 'yellow',
                key: 'in_progress',
              },
              { title: 'Done', key: 'Done', color: 'green', key: 'done' },
            ],
          },
          tags: {
            name: 'tags',
            type: 'tags',
            options: [
              {
                tag: 'Bug',
                color: '#ff4d4d35',
              },
              {
                tag: 'Feature',
                color: '#35f8ff35',
              },
              {
                tag: 'Enhancement',
                color: '#48ff5735',
              },
              {
                tag: 'First Issue',
                color: '#436fff35',
              },
              {
                tag: 'PR',
                color: '#e0ff3235',
              },
              {
                tag: 'Assigned',
                color: '#ff1eec35',
              },
            ],
          },
        },
        entries: [
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
            childs: [],
            statusKey: 'in_progress',
          },
        ],
      },
      {
        type: 'Database',
        id: '39b08a3d-12f1-4651-90f7-3289524fr4gg',
        title: 'Bud Test Database Kanban',
        description: 'This is a test database',
        defaultView: 'Kanban',
        created_at: '',
        updated_at: '',
        propertyPresets: {
          priority: {
            name: 'Priority',
            type: 'select',
            options: [
              { title: 'High', color: '#fff' },
              { title: 'Low', color: '#fff' },
              { title: 'Medium', color: '#fff' },
              { title: 'Normal', color: '#fff' },
            ],
          },
          status: {
            name: 'Status',
            type: 'select',
            options: [
              { title: 'Not Started', color: 'red', key: 'not_started' },
              { title: 'In Progress', color: 'yellow', key: 'in_progress' },
              { title: 'In Review', color: 'blue', key: 'in_review' },
              { title: 'Done', color: 'green', key: 'done' },
            ],
          },
          tags: {
            name: 'tags',
            type: 'tags',
            options: [
              {
                tag: 'Bug',
                color: '#ff4d4d35',
              },
              {
                tag: 'Feature',
                color: '#35f8ff35',
              },
              {
                tag: 'Enhancement',
                color: '#48ff5735',
              },
              {
                tag: 'First Issue',
                color: '#436fff35',
              },
              {
                tag: 'PR',
                color: '#e0ff3235',
              },
              {
                tag: 'Assigned',
                color: '#ff1eec35',
              },
            ],
          },
        },
        entries: [
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
            childs: [],
            statusKey: 'in_progress',
          },
        ],
      },
      {
        type: 'Database',
        id: '39b08a3d-12f1-4651-90f7-3289524fr4g2',
        title: 'Bud Test Database List',
        description: 'This is a test database',
        defaultView: 'List',
        created_at: '',
        updated_at: '',
        propertyPresets: {
          priority: {
            name: 'Priority',
            type: 'select',
            options: [
              { title: 'High', color: '#fff' },
              { title: 'Low', color: '#fff' },
              { title: 'Medium', color: '#fff' },
              { title: 'Normal', color: '#fff' },
            ],
          },
          status: {
            name: 'Status',
            type: 'select',
            options: [
              { title: 'Not Started', color: 'red', key: 'not_started' },
              { title: 'In Progress', color: 'yellow', key: 'in_progress' },
              { title: 'Done', color: 'green', key: 'done' },
            ],
          },
          tags: {
            name: 'tags',
            type: 'tags',
            options: [
              {
                tag: 'Bug',
                color: '#ff4d4d35',
              },
              {
                tag: 'Feature',
                color: '#35f8ff35',
              },
              {
                tag: 'Enhancement',
                color: '#48ff5735',
              },
              {
                tag: 'First Issue',
                color: '#436fff35',
              },
              {
                tag: 'PR',
                color: '#e0ff3235',
              },
              {
                tag: 'Assigned',
                color: '#ff1eec35',
              },
            ],
          },
        },
        entries: [
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
            childs: [],
            statusKey: 'in_progress',
          },
        ],
      },
    ],
  };

  return initialState;
};

const solveRec = (structure, id) => {
  console.log({ ...structure }, id, 'rec1');
  if (!structure || structure.length === 0) {
    return null;
  }
  for (const item of structure) {
    console.log({ ...structure }, id, { ...item }, 'rec2');
    if (item.documentID === id) {
      console.log(structure, id, { ...item }, 'rec3');
      return item;
    }
    if (item.childs && item.childs.length > 0) {
      const foundInFolders = solveRec(item.childs, id);
      if (foundInFolders) {
        console.log(foundInFolders, 'rec4');
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

// const solveRec = (obj, id, newId) => {
//   if(!obj){
//     return
//   }
//   if(obj.documentID === id){
//   console.log({...obj}, "poipo", JSON.stringify(id))
//     return obj;
//   }
//   else{
//     obj.childs.forEach(element => {
//       solveRec(element, id, newId)
//     });
//   }
// }

// Database Slice
export const databaseSlice = createSlice({
  name: 'database',
  initialState: generateDatabaseInitialState,
  extraReducers: (builder) => {
    builder.addCase(addEmptyDoc, (state, action: PayloadAction<any>) => {
      // Current Database ID
      // const db = state.databases.find((database) => database.id === action.payload.databaseID)

      const tempDatabases = state.databases;

      // eslint-disable-next-line no-restricted-syntax
      for (const database of tempDatabases) {
        if (database.id === action.payload.databaseID) {
          database.entries.push({
            documentID: action.payload.initialDocumentID,
            childs: [],
            statusKey: 'in_progress',
          });
          break;
        }
      }

      state.databases = tempDatabases;
    });
  },
  reducers: {
    sortEntryByArray: (state, action: PayloadAction<any>) => {
      // find db by  action.payload
      const localDb = state.databases;

      // for each string in array action.payload
      const localdbIndex = state.databases.findIndex(
        (database) => database.id === action.payload.databaseID
      );

      const compareFunction = (a: string, b: string) => {
        const aIndex = action.payload.entryOrder.indexOf(a.documentID);
        const bIndex = action.payload.entryOrder.indexOf(b.documentID);

        // If both elements are found in the first array, compare their indices
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }

        // If only one of the elements is found in the first array, prioritize the found element
        if (aIndex !== -1) {
          return -1;
        }
        if (bIndex !== -1) {
          return 1;
        }

        // If neither element is found in the first array, maintain the original order
        return 0;
      };

      localDb[localdbIndex].entries.sort(compareFunction);

      console.log('SordtedDB', localDb[localdbIndex].entries);

      state.databases = localDb;
    },
    changeDatabaseDefaultView: (state, action: PayloadAction<any>) => {
      console.log(action);
      const localDb = state.databases;
      const localdbIndex = state.databases.findIndex(
        (database) => database.id === action.payload.databaseID
      );

      localDb[localdbIndex].defaultView = action.payload.viewType;

      state.databases = localDb;
    },
    createNewEmptyDatabase: (state, action: PayloadAction<any>) => {
      state.databases.push(action.payload.databaseinfo);
    },
    attachDocumentToDatabase: (state, action: PayloadAction<any>) => {
      const localDb = state.databases;
      const localdbIndex = state.databases.findIndex(
        (database) => database.id === action.payload.databaseData.id
      );

      // Update Based On Index
      console.log('Local DB', localdbIndex);
      localDb[localdbIndex].entries.push({
        documentID: action.payload.initialDocumentID,
        childs: [],
        statusKey: 'in_progress',
      });

      state.databases = localDb;
    },
    moveDatabaseRow: (state, action: PayloadAction<any>) => {
      console.log('Move Array!', action);

      // get the current database from the state
      const currentDatabase = state.databases;

      console.log('Current State: ', currentDatabase.entries);

      currentDatabase.forEach((database: any, index: any) => {
        if (database.id === action.payload.databaseID) {
          console.log('Object Found', current(database));
          // get the current entry
          let currentEntry = database.entries;
          // move the entry to the new position
          // eslint-disable-next-line no-use-before-define
          currentEntry = moveArrayItemToNewIndex(
            currentEntry,
            action.payload.oldIndex,
            action.payload.newIndex
          );

          console.log('Updated Entries', current(currentEntry));
          // set the new entry
          currentDatabase[index].entries = currentEntry;
        }
      });

      console.log('Updated State: ', current(currentDatabase));

      state.databases = currentDatabase;
    },
    changeDatabaseStatusOrder: (state, action: PayloadAction<any>) => {
      const { dragResult } = action.payload;
      const copyOfDB = [...state.databases];
      const newCopyOFDB = copyOfDB.map((data) => {
        const eachData = { ...data };
        if (eachData.id === dragResult.destination.droppableId) {
          const copyOfPropertyPresets = [
            ...eachData.propertyPresets.status.options,
          ];
          const proxyOfPropertyPresets: any = [];
          copyOfPropertyPresets.forEach((stat) => {
            proxyOfPropertyPresets.push({ ...stat });
          });
          [
            proxyOfPropertyPresets[dragResult.source.index],
            proxyOfPropertyPresets[dragResult.destination.index],
          ] = [
            proxyOfPropertyPresets[dragResult.destination.index],
            proxyOfPropertyPresets[dragResult.source.index],
          ];
          eachData.propertyPresets.status.options = proxyOfPropertyPresets;
        }
        return eachData;
      });
      state.databases = newCopyOFDB;
    },
    addNewPropertPresetsStatusOptions: (state, action: PayloadAction<any>) => {
      const { id, newSectionParams } = action.payload;
      console.log('debug', action.payload);
      const copyOfDB = [...state.databases];
      const newCopyOFDB = copyOfDB.map((data) => {
        const eachData = { ...data };
        if (eachData.id === id) {
          const copyOfPropertyPresets = [
            ...eachData.propertyPresets.status.options,
          ];
          const proxyOfPropertyPresets: any = [];
          copyOfPropertyPresets.forEach((stat) => {
            proxyOfPropertyPresets.push({ ...stat });
          });
          proxyOfPropertyPresets.push(newSectionParams);
          eachData.propertyPresets.status.options = proxyOfPropertyPresets;
        }
        return eachData;
      });
      console.log('debug', newCopyOFDB);
      state.databases = newCopyOFDB;
    },
    addNewDocumentEntry: (state, action: PayloadAction<any>) => {
      const { docId, statusKey: sk, dbId } = action.payload;
      const sampleObjectToPush = {
        documentID: docId,
        statusKey: sk,
        childs: [],
      };
      const copyOfDB = [...state.databases];
      const newCopyOFDB = copyOfDB.map((data) => {
        const eachData = { ...data };
        if (eachData.id === dbId) {
          const copyOfEntries = [...eachData.entries];
          const proxyOfEntries: any = [];
          copyOfEntries.forEach((stat) => {
            proxyOfEntries.push({ ...stat });
          });
          proxyOfEntries.push(sampleObjectToPush);
          eachData.entries = proxyOfEntries;
        }
        return eachData;
      });
      state.databases = newCopyOFDB;
    },
    addTodos: (state, action: PayloadAction<any>) => {
      state.databases.map((database) => {
        if (database.defaultView === 'List') {
          const x = solveRec(database.entries, action.payload.id);
          console.log({ ...x }, 'addTodo');
          x.childs.push({
            documentID: action.payload.newId,
            childs: [],
          });
        }
      });
    },

    addTodosTable: (state, action: PayloadAction<any>) => {
      state.databases.map((database) => {
        if (database.defaultView === 'Table') {
          const x = solveRec(database.entries, action.payload.id);
          console.log({ ...x }, 'addTodo');
          x.childs.push({
            documentID: action.payload.newId,
            childs: [],
          });
        }
      });
    },

    addTodosKanban: (state, action: PayloadAction<any>) => {
      state.databases.map((database) => {
        if (database.defaultView === 'Kanban') {
          const x = solveRec(database.entries, action.payload.id);
          console.log({ ...x }, 'addTodo');
          x?.childs?.push({
            documentID: action.payload.newId,
            childs: [],
          });
        }
      });
    },

    editPropertPresetsStatusOptions: (state, action: PayloadAction<any>) => {
      const { id, statusKey, name } = action.payload;
      const copyOfDB = [...state.databases];
      const newCopyOFDB = copyOfDB.map((data) => {
        const eachData = { ...data };
        if (eachData.id === id) {
          const copyOfPropertyPresets = [
            ...eachData.propertyPresets.status.options,
          ];
          const newPropertyPresets = copyOfPropertyPresets.map((stat) => {
            if (stat.key === statusKey) {
              stat.title = name;
            }
            return stat;
          });
          eachData.propertyPresets.status.options = newPropertyPresets;
        }
        return eachData;
      });
      state.databases = newCopyOFDB;
    },
    changeRowOrderTodos: (state, action: PayloadAction<any>) => {
      const { id, result } = action.payload;
      const { source, destination } = result;
      state.databases.forEach((database) => {
        if (database.defaultView === 'List') {
          const x = solveRec(database.entries, action.payload.id);
          const newRowOrder = Array.from(x.childs);
          const [removed] = newRowOrder.splice(source.index, 1);
          newRowOrder.splice(destination.index, 0, removed);
          x.childs = newRowOrder;
        }
      });
    },
    changeRowOrderTodosKanban: (state, action: PayloadAction<any>) => {
      const { id, result } = action.payload;
      const { source, destination } = result;
      state.databases.map((database) => {
        if (database.defaultView === 'Kanban') {
          const x = solveRec(database.entries, action.payload.id);
          const newRowOrder = Array.from(x.childs);
          const [removed] = newRowOrder.splice(source.index, 1);
          newRowOrder.splice(destination.index, 0, removed);
          x.childs = newRowOrder;
        }
      });
    },
    setRowInTableDatabase: (state, action: PayloadAction<any>) => {
      state.databases.forEach((database) => {
        if (database.defaultView === 'Table') {
          if(database.id === action.payload.tableDatabaseId){
            database.entries.push({
              documentID: action.payload.obj.uuid,
              childs: [],
              statusKey: 'in_progress',
            })
          }
        }
      });
    }
  },
});

// Move Array Item
function moveArrayItemToNewIndex(arr: any, old_index: any, new_index: any) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export const {
  sortEntryByArray,
  createNewEmptyDatabase,
  moveDatabaseRow,
  changeDatabaseStatusOrder,
  addNewPropertPresetsStatusOptions,
  attachDocumentToDatabase,
  changeDatabaseDefaultView,
  addNewDocumentEntry,
  editPropertPresetsStatusOptions,
  addTodos,
  addTodosTable,
  changeRowOrderTodos,
  addTodosKanban,
  changeRowOrderTodosKanban,
  setRowInTableDatabase
} = databaseSlice.actions;

export default databaseSlice.reducer;
