import { createSlice, current } from "@reduxjs/toolkit";
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
              { title: 'Not Started', key: 'Not Started', color: '#939AFF' },
              { title: 'In Progress', key: 'In Progres', color: '#FFD976' },
              { title: 'Done', key: 'Done', color: '#36D95A' },
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
            childs: [{ documentID: '39b08a3d-12f1-4651-90f7-328952849dca' }],
            statusKey: 'Not Started',
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
              { title: 'Not Started', color: 'red' },
              { title: 'In Progress', color: 'yellow' },
              { title: 'In Review', color: 'blue' },
              { title: 'Done', color: 'green' },
            ],
          },
        },
        entries: [
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
            childs: [{ documentID: '39b08a3d-12f1-4651-90f7-328952849dca' }],
            statusKey: 'Not Started',
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
              { title: 'Not Started', color: '#fff' },
              { title: 'In Progress', color: '#fff' },
              { title: 'Done', color: '#fff' },
            ],
          },
        },
        entries: [
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
          },
          {
            documentID: '39b08a3d-12f1-4651-90f7-328952849dca',
          },
        ],
      },
    ],
  };

  return initialState;
};

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
          });
          break;
        }
      }

      state.databases = tempDatabases;
    });
  },
  reducers: {
    createNewEmptyDatabase: (state, action: PayloadAction<any>) => {
      state.databases.push(action.payload.databaseinfo);
    },
    moveDatabaseRow: (state, action: PayloadAction<any>) => {
      console.log('Move Array!',action);

      // get the current database from the state
      const currentDatabase = state.databases;

      console.log('Current State: ', currentDatabase.entries);

      currentDatabase.forEach((database, index) => {
        if (database.id === action.payload.databaseID) {

          console.log("Object Found", current(database));
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
  },
});

// Move Array Item
function moveArrayItemToNewIndex(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export const { createNewEmptyDatabase, moveDatabaseRow } =
  databaseSlice.actions;

export default databaseSlice.reducer;
