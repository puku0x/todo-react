import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TodoCreateDto } from '../../../../../models';
import { createTodo, isFetchingSelector } from '../../../../../store/todo';

export const useTodoCreateFacade = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector);

  const create = useCallback(
    (dto: TodoCreateDto) => {
      return dispatch(createTodo({ todo: dto }))
        .then(unwrapResult)
        .then((payload) => {
          const { todo } = payload;
          history.push(`/todos/${todo.id}`);
        });
    },
    [history, dispatch]
  );

  return {
    isFetching,
    create,
  } as const;
};
