import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { TodoListContainer } from './todo-list.container';
import { useTodoListFacade } from './todo-list.facade';

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  TodoList: jest.fn(() => null),
}));

jest.mock('./todo-list.facade', () => ({
  ...jest.requireActual('./todo-list.facade'),
  useTodoListFacade: jest.fn(() => ({ todos: [] })),
}));

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

describe('TodoListContainer', () => {
  it('should render', () => {
    const offset = 0;
    const limit = 10;
    const { baseElement } = render(
      <TodoListContainer offset={offset} limit={limit} />,
      { wrapper }
    );

    expect(useTodoListFacade).toBeCalledWith({ offset, limit });
    expect(baseElement).toBeTruthy();
  });
});
