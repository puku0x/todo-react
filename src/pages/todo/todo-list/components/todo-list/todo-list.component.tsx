import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import { NavLink as NavLinkBase } from 'react-router-dom';

import { Todo } from '../../../../../models';

const NavLink = styled(NavLinkBase)`
  &.completed {
    text-decoration: line-through;
  }
`;

type Props = {
  isFetching?: boolean;
  todos: Todo[];
  offset: number;
  limit: number;
  onChangeOffset?: (offset: number) => void;
  onChangeLimit?: (limit: number) => void;
};

export const TodoListComponent: React.FC<Props> = React.memo((props) => {
  const { todos, offset, limit, onChangeOffset, onChangeLimit } = props;

  const changeOffset = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      onChangeOffset?.(value);
    },
    [onChangeOffset]
  );

  const changeLimit = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      onChangeLimit?.(value);
    },
    [onChangeLimit]
  );

  return (
    <>
      <h2>todo-list</h2>
      <p>
        <NavLink to="/todos/new">Add a new todo</NavLink>
      </p>
      <form>
        {' offset '}
        <input
          type="number"
          min="0"
          name="offset"
          defaultValue={offset}
          onChange={changeOffset}
        />
        {' limit '}
        <input
          type="number"
          min="0"
          name="limit"
          defaultValue={limit}
          onChange={changeLimit}
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <NavLink
              className={cx([{ completed: todo.completed }])}
              to={`/todos/${todo.id}`}
            >
              {todo.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
});
