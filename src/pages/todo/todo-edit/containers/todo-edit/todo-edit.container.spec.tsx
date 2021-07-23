import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { TodoEditContainer } from './todo-edit.container';
import { useTodoEditFacade } from './todo-edit.facade';

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  TodoEdit: jest.fn(() => null),
}));

jest.mock('./todo-edit.facade', () => ({
  ...jest.requireActual('./todo-edit.facade'),
  useTodoEditFacade: jest.fn(() => ({})),
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

describe('TodoEditContainer', () => {
  it('should render', () => {
    const id = '1';
    const { baseElement } = render(<TodoEditContainer id={id} />, {
      wrapper,
    });

    expect(useTodoEditFacade).toBeCalledWith({ id });
    expect(baseElement).toBeTruthy();
  });
});
