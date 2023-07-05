import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../reducers/users';
import projectsSlice from '../reducers/projects';
import feesSlice from '../reducers/fees';
import transactionsSlice from '../reducers/transactions';
import paymentsSlice from '../reducers/payments';
import profileSlice from '../reducers/profile';
import customersSlice from '../reducers/customers';

const store = configureStore({
  reducer: {
    users: usersSlice,
    projects: projectsSlice,
    fees: feesSlice,
    transactions: transactionsSlice,
    payments: paymentsSlice,
    profile: profileSlice,
    customers: customersSlice,
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