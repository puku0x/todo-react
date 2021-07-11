import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TodoListPage } from './todo-list.page';
import { useTodoListParams } from './todo-list.params';

jest.mock('./containers', () => ({
  ...jest.requireActual('./containers'),
  TodoListContainer: jest.fn(() => null),
}));

jest.mock('./todo-list.params', () => ({
  ...jest.requireActual('./todo-list.params'),
  useTodoListParams: jest.fn(() => ({ offset: 0, limit: 10 })),
}));

describe('TodoListPage', () => {
  it('should render', () => {
    const { baseElement } = render(<TodoListPage />, {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(useTodoListParams).toHaveBeenCalledWith();
    expect(baseElement).toBeTruthy();
  });
});
