import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useTodoStore } from '../../../../../store';
import { TodoListComponent } from '../../components';

type Props = {
  offset: number;
  limit: number;
};

export const TodoListContainer: FunctionComponent<Props> = memo((props) => {
  const { offset, limit } = props;
  const history = useHistory();
  const location = useLocation();
  const { isFetching, todos, fetchAll } = useTodoStore();

  const changeOffset = useCallback(
    (offset: number) => {
      const params = new URLSearchParams(location.search);
      params.set('offset', `${offset}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  const changeLimit = useCallback(
    (limit: number) => {
      const params = new URLSearchParams(location.search);
      params.set('limit', `${limit}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  useEffect(() => {
    fetchAll({ offset, limit });
  }, [offset, limit, fetchAll]);

  return (
    <TodoListComponent
      isFetching={isFetching}
      todos={todos}
      offset={offset}
      limit={limit}
      onChangeOffset={changeOffset}
      onChangeLimit={changeLimit}
    />
  );
});
