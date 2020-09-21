import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TodoCreateDto, TodoUpdateDto } from '../../../models';
import { AppDispatch } from '../../store';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo
} from '../actions';
import { isFetchingSelector, todosSelector, todoSelector } from '../selectors';

export const useTodoStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector);
  const todos = useSelector(todosSelector);
  const todo = useSelector(todoSelector);

  const fetchAll = useCallback(
    (arg: { offset?: number; limit?: number } = {}) => {
      return dispatch(fetchAllTodos(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const fetch = useCallback(
    (arg: { id: string }) => {
      return dispatch(fetchTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const create = useCallback(
    (arg: { todo: TodoCreateDto }) => {
      return dispatch(createTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const update = useCallback(
    (arg: { id: string; todo: TodoUpdateDto }) => {
      return dispatch(updateTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  const remove = useCallback(
    (arg: { id: string }) => {
      return dispatch(removeTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  return {
    isFetching,
    todos,
    todo,
    fetchAll,
    fetch,
    create,
    update,
    remove
  } as const;
};
