import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { fetchTodo } from '../../../../../store/todo';
import { useTodoDetailFacade } from './todo-detail.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../../../../../store/todo', () => ({
  ...jest.requireActual('../../../../../store/todo'),
  fetchTodo: jest.fn(),
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

describe('useTodoDetailFacade', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchTodo', async () => {
    const id = '1';
    const { result } = renderHook(() => useTodoDetailFacade({ id }), {
      wrapper,
    });
    const { fetch } = result.current;
    fetch({ id });

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchTodo).toHaveBeenCalledWith({ id });
  });
});
