import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { fetchAllTodos } from '../../../../../store/todo';
import { useTodoListFacade } from './todo-list.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../../../../../store/todo', () => ({
  ...jest.requireActual('../../../../../store/todo'),
  fetchAllTodos: jest.fn(),
}));

const wrapper = (props: PropsWithChildren<MemoryRouterProps>) => {
  const { children, initialEntries, initialIndex } = props;
  const store = configureStore({ reducer: jest.fn() });

  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

describe('useTodoListFacade', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchAllTodos', async () => {
    const offset = 0;
    const limit = 10;
    const { result } = renderHook(() => useTodoListFacade({ offset, limit }), {
      wrapper,
    });
    const { fetchAll } = result.current;
    fetchAll({ offset, limit });

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchAllTodos).toHaveBeenCalledWith({ offset, limit });
  });
});
