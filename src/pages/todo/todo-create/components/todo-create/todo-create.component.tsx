import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { TodoCreateDto } from '../../../../../models';
import { useTodoCreatePresenter } from './todo-create.presenter';

type Props = {
  isFetching?: boolean;
  onCreate?: (todo: TodoCreateDto) => void;
};

export const TodoCreate: React.FC<Props> = React.memo((props) => {
  const { isFetching, onCreate } = props;

  const {
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useTodoCreatePresenter({ onCreate });

  return (
    <>
      <NavLink to="/todos">Back to list</NavLink>
      <h2>todo-create</h2>
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
});
