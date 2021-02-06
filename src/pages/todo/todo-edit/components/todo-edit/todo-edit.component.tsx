import { FunctionComponent, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Todo, TodoUpdateDto } from '../../../../../models';
import { useTodoEditPresenter } from './todo-edit.presenter';

type Props = {
  isFetching?: boolean;
  todo: Todo | null;
  onUpdate?: (todo: TodoUpdateDto) => void;
};

export const TodoEdit: FunctionComponent<Props> = memo((props) => {
  const { isFetching, todo, onUpdate } = props;

  const {
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useTodoEditPresenter({ todo, onUpdate });

  return (
    <>
      <NavLink to={`/todos/${todo?.id}`}>Back to detail</NavLink>
      <h2>todo-edit</h2>
      {todo ? (
        <>
          <form onSubmit={handleSubmit}>
            <p>
              <button
                type="submit"
                disabled={isFetching || !isValid}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                Save
              </button>
            </p>
            <table>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      defaultValue={todo.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>completed</td>
                  <td>
                    <input
                      type="checkbox"
                      name="completed"
                      defaultChecked={todo.completed}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </>
      ) : (
        <>loading...</>
      )}
    </>
  );
});
