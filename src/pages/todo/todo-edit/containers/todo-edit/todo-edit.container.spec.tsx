import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

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
