import { memo } from 'react';

import { TodoDetail } from '../../components';
import { useTodoDetailFacade } from './todo-detail.facade';

interface Props {
  id: string;
}

export const TodoDetailContainer = memo((props: Props) => {
  const { id } = props;
  const { isFetching, todo } = useTodoDetailFacade({ id });

  return <TodoDetail isFetching={isFetching} todo={todo} />;
});
