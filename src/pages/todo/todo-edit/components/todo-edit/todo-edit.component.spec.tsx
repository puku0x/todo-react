import { act, render } from '@testing-library/react';
import { Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Todo } from '../../../../../models';
import { TodoEdit } from './todo-edit.component';

describe('TodoEdit', () => {
  it('render', async () => {
    const todo: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoEdit todo={todo} />, {
        wrapper: MemoryRouter,
      });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });

  it('render with isFetching', async () => {
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoEdit isFetching todo={null} />, {
        wrapper: MemoryRouter,
      });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });
});
