import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
// import { Store } from 'redux';
// import createSagaMiddleware, { Task } from 'redux-saga';

import reducer from '../reducers';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
// interface SagaStore extends Store {
//   sagaTask?: Task;
// }

// const sagaMiddleware = createSagaMiddleware();

const createStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV === 'development',
});

const store = () => createStore;

// const createStore = configureStore({
//   reducer,
//   // middleware: [sagaMiddleware],
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//   devTools: process.env.NODE_ENV === 'development',
// });

// const store = () => {
//   // Next Redux Toolkit 에서 saga를 사용해야할 때
//   (createStore as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
//   return createStore;
// };

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;

export default wrapper;
