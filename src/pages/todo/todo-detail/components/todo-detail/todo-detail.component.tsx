import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Todo } from '../../../../../models';

const datePipe = (date: number) => {
  return new Date(date).toISOString();
};

interface Props {
  isFetching?: boolean;
  todo: Todo | null;
}

export const TodoDetail = memo((props: Props) => {
  const { todo } = props;

  return (
    <>
      <NavLink to="/todos">Back to list</NavLink>
      <h2>todo-detail</h2>
      {todo ? (
        <>
          <p>
            <NavLink to={`/todos/${todo.id}/edit`}>Edit this todo</NavLink>
          </p>
          <table>
            <tbody>
              <tr>
                <td>title</td>
                <td>{todo.title}</td>
              </tr>
              <tr>
                <td>completed</td>
                <td>{`${todo.completed}`}</td>
              </tr>
              <tr>
                <td>createdAt</td>
                <td>{datePipe(todo.createdAt)}</td>
              </tr>
              <tr>
                <td>updatedAt</td>
                <td>{datePipe(todo.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>loading...</>
      )}
    </>
  );
});
