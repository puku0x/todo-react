import { memo } from 'react';

import { TodoEdit } from '../../components';
import { useTodoEditFacade } from './todo-edit.facade';

interface Props {
  id: string;
}

export const TodoEditContainer = memo((props: Props) => {
  const { id } = props;
  const { isFetching, todo, update } = useTodoEditFacade({ id });

  return <TodoEdit isFetching={isFetching} todo={todo} onUpdate={update} />;
});
