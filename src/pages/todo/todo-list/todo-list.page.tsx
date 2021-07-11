import { memo } from 'react';

import { TodoListContainer } from './containers';
import { useTodoListParams } from './todo-list.params';

export const TodoListPage = memo(() => {
  const { offset, limit } = useTodoListParams();

  return <TodoListContainer offset={offset} limit={limit} />;
});
