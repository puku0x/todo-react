import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

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
