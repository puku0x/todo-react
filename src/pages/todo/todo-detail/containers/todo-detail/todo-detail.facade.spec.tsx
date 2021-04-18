import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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
