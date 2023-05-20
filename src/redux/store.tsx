import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import workspaceReducer from './slices/workspace';
import contentReducer from './slices/content';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workspace: workspaceReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
