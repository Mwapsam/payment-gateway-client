import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../reducers/users';
import projectsSlice from '../reducers/projects';

const store = configureStore({
  reducer: {
    users: usersSlice,
    projects: projectsSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['payload'],
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      ignoredPaths: ['items.dates'],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;