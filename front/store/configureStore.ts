import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
interface SagaStore extends Store {
  sagaTask?: Task;
}

const sagaMiddleware = createSagaMiddleware();

const createStore = configureStore({
  reducer: reducer,
  // middleware: [sagaMiddleware],
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

const store = () => {
  // Next Redux Toolkit 에서 saga를 사용해야할 때
  (createStore as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return createStore;
}

const wrapper = createWrapper(store, { debug: process.env.NODE_ENV === 'development' });

export type RootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;

// export type AppStore = ReturnType<typeof store>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export default wrapper;
