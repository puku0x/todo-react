import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import {
  fetchAllTodos,
  isFetchingSelector,
  todosSelector,
} from '../../../store';

export const useTodoListFacade = (arg: { offset?: number; limit?: number }) => {
  const { offset, limit } = arg;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<unknown, undefined, AnyAction>>();
  const isFetching = useSelector(isFetchingSelector);
  const todos = useSelector(todosSelector);

  const fetchAll = useCallback(
    (arg: { offset?: number; limit?: number }) => {
      return dispatch(fetchAllTodos(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const changeOffset = useCallback(
    (offset: number) => {
      const params = new URLSearchParams(location.search);
      params.set('offset', `${offset}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  const changeLimit = useCallback(
    (limit: number) => {
      const params = new URLSearchParams(location.search);
      params.set('limit', `${limit}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  useEffect(() => {
    fetchAll({ offset, limit });
  }, [offset, limit, fetchAll]);

  return {
    isFetching,
    todos,
    changeOffset,
    changeLimit,
    fetchAll,
  } as const;
};
