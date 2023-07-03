import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {},
});

export default databaseSlice.reducer;
