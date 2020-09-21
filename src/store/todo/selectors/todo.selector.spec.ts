import { Todo } from '../../../models';
import { TodoState, adapter, featureKey, initialState } from '../states';
import {
  isFetchingSelector,
  selectedIdSelector,
  todoSelector,
  todosSelector,
} from './todo.selector';

interface State {
  [featureKey]: TodoState;
}

describe('selectors', () => {
  it('should handle isFetchingSelector', () => {
    const isFetching = true;
    const state: State = {
      [featureKey]: {
        ...initialState,
        isFetching,
      },
    };

    expect(isFetchingSelector(state)).toEqual(isFetching);
  });

  it('should handle selectedIdSelector', () => {
    const selectedId = '1';
    const state: State = {
      [featureKey]: {
        ...initialState,
        selectedId,
      },
    };

    expect(selectedIdSelector(state)).toEqual(selectedId);
  });

  it('should handle todoSelector', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
      {
        id: '2',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
      {
        id: '3',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
    ];
    const state1: State = {
      [featureKey]: adapter.setAll({ ...initialState, selectedId: '1' }, todos),
    };
    const state2: State = {
      [featureKey]: adapter.setAll(
        { ...initialState, selectedId: '999' },
        todos
      ),
    };
    const state3: State = {
      [featureKey]: adapter.setAll({ ...initialState }, todos),
    };

    expect(todoSelector(state1)).toEqual(todos[0]);
    expect(todoSelector(state2)).toEqual(null);
    expect(todoSelector(state3)).toEqual(null);
  });

  it('should handle todosSelector', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
      {
        id: '2',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
      {
        id: '3',
        title: 'title',
        completed: false,
        createdAt: 123456789,
        updatedAt: 123456789,
      },
    ];
    const state: State = {
      [featureKey]: adapter.setAll(initialState, todos),
    };

    expect(todosSelector(state)).toEqual(todos);
  });
});
