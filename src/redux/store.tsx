import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import workspaceReducer from './slices/workspace';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workspace:workspaceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
