import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { TodoDetailContainer } from './containers';

interface RouterParams {
  id: string;
}

export const TodoDetailPage = memo(() => {
  const { id } = useParams<RouterParams>();

  return <TodoDetailContainer id={id} />;
});
