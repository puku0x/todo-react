import { memo } from 'react';

import { TodoDetailContainer } from './containers';
import { useTodoDetailParams } from './todo-detail.params';

export const TodoDetailPage = memo(() => {
  const { id } = useTodoDetailParams();

  return <TodoDetailContainer id={id} />;
});
