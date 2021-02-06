import { FunctionComponent, memo, useEffect } from 'react';

import { useTodoStore } from '../../../../../store';
import { TodoDetail } from '../../components';

type Props = {
  id: string;
};

export const TodoDetailContainer: FunctionComponent<Props> = memo((props) => {
  const { id } = props;
  const { isFetching, todo, fetch } = useTodoStore();

  useEffect(() => {
    fetch({ id });
  }, [id, fetch]);

  return <TodoDetail isFetching={isFetching} todo={todo} />;
});
