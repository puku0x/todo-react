import * as React from 'react';
import { useParams } from 'react-router-dom';

import { TodoDetailContainer } from './containers';

interface RouterParams {
  id: string;
}

export const TodoDetailPage: React.FC = React.memo(() => {
  const { id } = useParams<RouterParams>();

  return <TodoDetailContainer id={id} />;
});
