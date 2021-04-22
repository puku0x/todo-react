import { act, render } from '@testing-library/react';
import { Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { createTodosMock } from '../../../../../models/testing';
import { TodoList } from './todo-list.component';

describe('TodoList', () => {
  it('render', async () => {
    const todos = createTodosMock();
    const offset = 0;
    const limit = 10;
    let result = render(<Fragment />);
    await act(async () => {
      result = render(
        <TodoList todos={todos} offset={offset} limit={limit} />,
        { wrapper: MemoryRouter }
      );
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });

  it('render with isFetching', async () => {
    const offset = 0;
    const limit = 10;
    let result = render(<Fragment />);
    await act(async () => {
      result = render(
        <TodoList isFetching todos={[]} offset={offset} limit={limit} />,
        { wrapper: MemoryRouter }
      );
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });
});
