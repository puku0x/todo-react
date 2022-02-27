import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TodoUpdateDto } from '../../../../../models';
import {
  fetchTodo,
  updateTodo,
  isFetchingSelector,
  todoSelector,
} from '../../../../../store/todo';

export const useTodoEditFacade = (arg: { id: string }) => {
  const { id } = arg;
  const history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector);
  const todo = useSelector(todoSelector);

  const fetch = useCallback(
    (arg: { id: string }) => {
      return dispatch(fetchTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const update = useCallback(
    (id: string, dto: TodoUpdateDto) => {
      return dispatch(updateTodo({ id, todo: dto }))
        .then(unwrapResult)
        .then((payload) => {
          const { todo } = payload;
          history.push(`/todos/${todo.id}`);
        });
    },
    [history, dispatch]
  );

  useEffect(() => {
    fetch({ id });
  }, [id, fetch]);

  return {
    isFetching,
    todo,
    fetch,
    update,
  } as const;
};
