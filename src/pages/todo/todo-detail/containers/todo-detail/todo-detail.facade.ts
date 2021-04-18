import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchTodo,
  isFetchingSelector,
  todoSelector,
} from '../../../../../store/todo';

export const useTodoDetailFacade = (arg: { id: string }) => {
  const { id } = arg;
  const dispatch = useDispatch<ThunkDispatch<unknown, undefined, AnyAction>>();
  const isFetching = useSelector(isFetchingSelector);
  const todo = useSelector(todoSelector);

  const fetch = useCallback(
    (arg: { id: string }) => {
      return dispatch(fetchTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  useEffect(() => {
    fetch({ id });
  }, [id, fetch]);

  return {
    isFetching,
    todo,
    fetch,
  } as const;
};
