import * as React from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { TodoCreateDto } from '../../../../../models';
import { useTodoStore } from '../../../../../store';
import { TodoCreate } from '../../components';

export const TodoCreateContainer: React.FC = React.memo((props) => {
  const history = useHistory();
  const { isFetching, create } = useTodoStore();

  const onCreate = useCallback(
    (todo: TodoCreateDto) => {
      create({ todo }).then((payload) => {
        const { todo } = payload;
        history.push(`/todos/${todo.id}`);
      });
    },
    [history, create]
  );

  return <TodoCreate isFetching={isFetching} onCreate={onCreate} />;
});
