import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from '../actions';
import { useTodoStore } from './todo.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual<Record<string, unknown>>('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../actions');

const mockStore = configureStore();
const store = mockStore();

const wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('facades', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchAllTodos', async () => {
    const { result } = renderHook(() => useTodoStore(), { wrapper });
    const { fetchAll } = result.current;
    const arg = { offset: 1, limit: 10 };
    fetchAll(arg);

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchAllTodos).toHaveBeenCalledWith(arg);
  });

  it('should dispatch fetchTodo', async () => {
    const { result } = renderHook(() => useTodoStore(), { wrapper });
    const { fetch } = result.current;
    const arg = { id: '1' };
    fetch(arg);

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchTodo).toHaveBeenCalledWith(arg);
  });

  it('should dispatch createTodo', async () => {
    const { result } = renderHook(() => useTodoStore(), { wrapper });
    const { create } = result.current;
    const arg = {
      todo: {
        title: 'title',
      },
    };
    create(arg);

    expect(mockDispatch).toHaveBeenCalled();
    expect(createTodo).toHaveBeenCalledWith(arg);
  });

  it('should dispatch updateTodo', async () => {
    const { result } = renderHook(() => useTodoStore(), { wrapper });
    const { update } = result.current;
    const arg = {
      id: '1',
      todo: {
        id: '1',
        title: 'title',
        completed: false,
      },
    };
    update(arg);

    expect(mockDispatch).toHaveBeenCalled();
    expect(updateTodo).toHaveBeenCalledWith(arg);
  });

  it('should dispatch removeTodo', async () => {
    const { result } = renderHook(() => useTodoStore(), { wrapper });
    const { remove } = result.current;
    const arg = { id: '1' };
    remove(arg);

    expect(mockDispatch).toHaveBeenCalled();
    expect(removeTodo).toHaveBeenCalledWith(arg);
  });
});
