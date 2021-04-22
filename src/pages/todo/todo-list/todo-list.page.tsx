import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoListContainer } from './containers';

export const TodoListPage = memo(() => {
  const location = useLocation();
  const { offset, limit } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const offset = +(params.get('offset') || '0');
    const limit = +(params.get('limit') || '10');

    return {
      offset,
      limit,
    } as const;
  }, [location.search]);

  return <TodoListContainer offset={offset} limit={limit} />;
});
