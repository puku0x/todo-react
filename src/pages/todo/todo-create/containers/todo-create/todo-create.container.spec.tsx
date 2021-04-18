import { render } from '@testing-library/react';

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

describe('TodoCreateContainer', () => {
  it('should render', () => {
    const { baseElement } = render(<TodoCreateContainer />);

    expect(useTodoCreateFacade).toBeCalledWith();
    expect(baseElement).toBeTruthy();
  });
});
