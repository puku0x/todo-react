import {
  Reducer,
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

const reducer = combineReducers<any>({});

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

export const addReducer = (key: string, value: Reducer) => {
  store.replaceReducer(
    combineReducers({
      ...reducer,
      [key]: value,
    })
  );
};

export type State = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
