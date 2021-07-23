import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import {
  generateTodoCreateDtoMock,
  generateTodoMock,
} from '../../../../../models/testing';
import { createTodo } from '../../../../../store/todo';
import { useTodoCreateFacade } from './todo-create.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../../../../../store/todo', () => ({
  ...jest.requireActual('../../../../../store/todo'),
  createTodo: jest.fn(),
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

describe('useTodoCreateFacade', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch createTodo', async () => {
    const { result } = renderHook(() => useTodoCreateFacade(), { wrapper });
    const { create } = result.current;
    const dto = generateTodoCreateDtoMock();
    const todo = generateTodoMock();

    mockDispatch.mockResolvedValue({ payload: { todo } });

    create(dto);

    expect(mockDispatch).toHaveBeenCalled();
    expect(createTodo).toHaveBeenCalledWith({ todo: dto });
  });
});
