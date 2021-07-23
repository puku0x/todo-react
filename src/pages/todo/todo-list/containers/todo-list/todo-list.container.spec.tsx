import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

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

const wrapper = (props: PropsWithChildren<MemoryRouterProps>) => {
  const { children, initialEntries, initialIndex } = props;
  const store = configureStore({ reducer: jest.fn() });

  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

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
