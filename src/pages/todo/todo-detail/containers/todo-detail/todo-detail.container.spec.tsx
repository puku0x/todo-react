import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

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

const mockStore = configureStore();
const store = mockStore();

const wrapper: FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

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
