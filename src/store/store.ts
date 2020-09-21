import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import * as todo from './todo';

const reducer = combineReducers({
  [todo.featureKey]: todo.reducer,
});

const middleware = getDefaultMiddleware({
  thunk: true,
  immutableCheck: true,
  serializableCheck: true,
});

export const store = configureStore({
  reducer,
  middleware,
  devTools: true,
});

export type State = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
