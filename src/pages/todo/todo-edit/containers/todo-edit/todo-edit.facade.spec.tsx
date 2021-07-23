import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import {
  generateTodoUpdateDtoMock,
  generateTodoMock,
} from '../../../../../models/testing';
import { fetchTodo, updateTodo } from '../../../../../store/todo';
import { useTodoEditFacade } from './todo-edit.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../../../../../store/todo', () => ({
  ...jest.requireActual('../../../../../store/todo'),
  fetchTodo: jest.fn(),
  updateTodo: jest.fn(),
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

describe('useTodoEditFacade', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchTodo', async () => {
    const id = '1';
    const { result } = renderHook(() => useTodoEditFacade({ id }), {
      wrapper,
    });
    const { fetch } = result.current;
    fetch({ id });

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchTodo).toHaveBeenCalledWith({ id });
  });

  it('should dispatch updateTodo', async () => {
    const id = '1';
    const { result } = renderHook(() => useTodoEditFacade({ id }), {
      wrapper,
    });
    const { update } = result.current;
    const dto = generateTodoUpdateDtoMock();
    const todo = generateTodoMock();

    mockDispatch.mockResolvedValue({ payload: { todo } });

    update(id, dto);

    expect(mockDispatch).toHaveBeenCalled();
    expect(updateTodo).toHaveBeenCalledWith({ id, todo: dto });
  });
});
