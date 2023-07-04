import { createSlice } from '@reduxjs/toolkit';
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
        title: 'Bud Test Database',
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
  },
});

export const { createNewEmptyDatabase } = databaseSlice.actions;

export default databaseSlice.reducer;
