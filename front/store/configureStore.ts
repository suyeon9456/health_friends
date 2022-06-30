import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import reducer from '../reducers';

const createStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV === 'development',
});

const store = () => createStore;

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;

export default wrapper;
