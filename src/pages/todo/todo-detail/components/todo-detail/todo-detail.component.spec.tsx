import { act, render } from '@testing-library/react';
import { Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { generateTodoMock } from '../../../../../models/testing';
import { TodoDetail } from './todo-detail.component';

describe('TodoDetail', () => {
  it('render', async () => {
    const todo = generateTodoMock();
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoDetail todo={todo} />, { wrapper: MemoryRouter });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });

  it('render with isFetching', async () => {
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoDetail isFetching todo={null} />, {
        wrapper: MemoryRouter,
      });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });
});
