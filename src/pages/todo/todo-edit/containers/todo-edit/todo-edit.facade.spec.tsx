import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

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
