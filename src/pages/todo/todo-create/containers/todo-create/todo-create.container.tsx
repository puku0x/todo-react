import { memo } from 'react';

import { TodoCreate } from '../../components';
import { useTodoCreateFacade } from './todo-create.facade';

export const TodoCreateContainer = memo(() => {
  const { isFetching, create } = useTodoCreateFacade();

  return <TodoCreate isFetching={isFetching} onCreate={create} />;
});
