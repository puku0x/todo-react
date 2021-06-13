import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { fetchAllTodos } from '../../../store';
import { useTodoListFacade } from './todo-list.facade';

const mockDispatch = jest.fn().mockResolvedValue({});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

jest.mock('../../../store', () => ({
  ...jest.requireActual('../../../store'),
  fetchAllTodos: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

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
