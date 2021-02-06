import { FunctionComponent, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoListContainer } from './containers';

export const TodoListPage: FunctionComponent = memo(() => {
  const location = useLocation();
  const params = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  const offset = +(params.get('offset') || '0');
  const limit = +(params.get('limit') || '10');

  return <TodoListContainer offset={offset} limit={limit} />;
});
