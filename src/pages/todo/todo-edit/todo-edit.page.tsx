import * as React from 'react';
import { useParams } from 'react-router-dom';

import { TodoEditContainer } from './containers';

interface RouterParams {
  id: string;
}

export const TodoEditPage: React.FC = React.memo(() => {
  const { id } = useParams<RouterParams>();

  return <TodoEditContainer id={id} />;
});
