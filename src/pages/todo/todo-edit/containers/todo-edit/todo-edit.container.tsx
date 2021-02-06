import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { TodoUpdateDto } from '../../../../../models';
import { useTodoStore } from '../../../../../store';
import { TodoEdit } from '../../components';

type Props = {
  id: string;
};

export const TodoEditContainer: FunctionComponent<Props> = memo((props) => {
  const { id } = props;
  const history = useHistory();
  const { isFetching, todo, fetch, update } = useTodoStore();

  const onUpdate = useCallback(
    (todo: TodoUpdateDto) => {
      update({ id, todo }).then((payload) => {
        const { todo } = payload;
        history.push(`/todos/${todo.id}`);
      });
    },
    [id, history, update]
  );

  useEffect(() => {
    fetch({ id });
  }, [id, fetch]);

  return <TodoEdit isFetching={isFetching} todo={todo} onUpdate={onUpdate} />;
});
