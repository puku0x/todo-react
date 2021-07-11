import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';

import { useTodoListParams } from './todo-list.params';

describe('useTodoListParams', () => {
  it('should render', () => {
    const { result } = renderHook(() => useTodoListParams(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
          {children}
        </MemoryRouter>
      ),
    });
    const { limit, offset } = result.current;

    expect(limit).toEqual(10);
    expect(offset).toEqual(0);
  });

  it('should render with query', () => {
    const { result } = renderHook(() => useTodoListParams(), {
      wrapper: ({ children }) => (
        <MemoryRouter
          initialEntries={[{ pathname: '/', search: '?offset=10&limit=20' }]}
        >
          {children}
        </MemoryRouter>
      ),
    });
    const { limit, offset } = result.current;

    expect(limit).toEqual(20);
    expect(offset).toEqual(10);
  });
});
