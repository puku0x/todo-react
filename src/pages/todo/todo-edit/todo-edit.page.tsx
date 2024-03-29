import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { TodoEditContainer } from './containers';

interface RouterParams {
  id: string;
}

export const TodoEditPage = memo(() => {
  const { id } = useParams<RouterParams>();

  return <TodoEditContainer id={id} />;
});
