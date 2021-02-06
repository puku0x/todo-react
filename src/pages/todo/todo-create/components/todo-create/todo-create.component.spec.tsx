import { act, render } from '@testing-library/react';
import { Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { TodoCreate } from './todo-create.component';

describe('TodoCreate', () => {
  it('render', async () => {
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoCreate />, {
        wrapper: MemoryRouter,
      });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });

  it('render with isFetching', async () => {
    let result = render(<Fragment />);
    await act(async () => {
      result = render(<TodoCreate isFetching />, {
        wrapper: MemoryRouter,
      });
    });
    const { asFragment } = result;

    expect(asFragment()).toMatchSnapshot();
  });
});
