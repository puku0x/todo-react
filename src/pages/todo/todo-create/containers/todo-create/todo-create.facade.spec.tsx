import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { TodoCreateDto } from '../../../../../models';
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
  <Provider store={store}>{children}</Provider>
);

describe('useTodoCreateFacade', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch createTodo', async () => {
    const { result } = renderHook(() => useTodoCreateFacade(), { wrapper });
    const { create } = result.current;
    const dto: TodoCreateDto = {
      title: 'title',
    };
    create(dto);

    expect(mockDispatch).toHaveBeenCalled();
    expect(createTodo).toHaveBeenCalledWith({ todo: dto });
  });
});
