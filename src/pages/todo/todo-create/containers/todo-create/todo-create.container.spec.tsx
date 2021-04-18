import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

describe('TodoCreateContainer', () => {
  it('should render', () => {
    const { baseElement } = render(<TodoCreateContainer />, { wrapper });

    expect(useTodoCreateFacade).toBeCalledWith();
    expect(baseElement).toBeTruthy();
  });
});
