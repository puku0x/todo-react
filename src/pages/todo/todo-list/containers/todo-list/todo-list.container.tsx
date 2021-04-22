import { memo } from 'react';

import { TodoList } from '../../components';
import { useTodoListFacade } from './todo-list.facade';

type Props = {
  offset: number;
  limit: number;
};

export const TodoListContainer = memo((props: Props) => {
  const { offset, limit } = props;
  const { isFetching, todos, changeOffset, changeLimit } = useTodoListFacade({
    offset,
    limit,
  });

  return (
    <TodoList
      isFetching={isFetching}
      todos={todos}
      offset={offset}
      limit={limit}
      onChangeOffset={changeOffset}
      onChangeLimit={changeLimit}
    />
  );
});
