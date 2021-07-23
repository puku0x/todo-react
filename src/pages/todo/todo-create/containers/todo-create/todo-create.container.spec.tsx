import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { TodoCreateContainer } from './todo-create.container';
import { useTodoCreateFacade } from './todo-create.facade';

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  TodoCreate: jest.fn(() => null),
}));

jest.mock('./todo-create.facade', () => ({
  ...jest.requireActual('./todo-create.facade'),
  useTodoCreateFacade: jest.fn(() => ({})),
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

describe('TodoCreateContainer', () => {
  it('should render', () => {
    const { baseElement } = render(<TodoCreateContainer />, { wrapper });

    expect(useTodoCreateFacade).toBeCalledWith();
    expect(baseElement).toBeTruthy();
  });
});
