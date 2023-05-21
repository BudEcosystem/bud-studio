import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import workspaceReducer from './slices/workspace';
import contentReducer from './slices/content';
import kanbanReducer from './slices/kanban';

const persistConfig = {
  key: 'root',
  storage,
};
const reducer = combineReducers({
  workspace: workspaceReducer,
  content: contentReducer,
  kanban: kanbanReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
