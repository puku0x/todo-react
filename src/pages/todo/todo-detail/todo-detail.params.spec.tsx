import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter, Route } from 'react-router-dom';

import { useTodoDetailParams } from './todo-detail.params';

describe('useTodoDetailParams', () => {
  it('should render', () => {
    const { result } = renderHook(() => useTodoDetailParams(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[{ pathname: '/todos/1' }]}>
          <Route path="/todos/:id">{children}</Route>
        </MemoryRouter>
      ),
    });
    const { id } = result.current;

    expect(id).toEqual('1');
  });
});
