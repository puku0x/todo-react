import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { TodoDetailContainer } from './todo-detail.container';
import { useTodoDetailFacade } from './todo-detail.facade';

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  TodoDetail: jest.fn(() => null),
}));

jest.mock('./todo-detail.facade', () => ({
  ...jest.requireActual('./todo-detail.facade'),
  useTodoDetailFacade: jest.fn(() => ({})),
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

describe('TodoDetailContainer', () => {
  it('should render', () => {
    const id = '1';
    const { baseElement } = render(<TodoDetailContainer id={id} />, {
      wrapper,
    });

    expect(useTodoDetailFacade).toBeCalledWith({ id });
    expect(baseElement).toBeTruthy();
  });
});
