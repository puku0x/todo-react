import { generateTodosMock } from '../../../models/testing';
import { State, adapter, featureKey, initialState } from '../states';
import {
  isFetchingSelector,
  selectedIdSelector,
  todoSelector,
} from './todo.selector';

interface RootState {
  [featureKey]: State;
}

describe('selectors', () => {
  it('should handle isFetchingSelector', () => {
    const isFetching = true;
    const state: RootState = {
      [featureKey]: {
        ...initialState,
        isFetching,
      },
    };

    expect(isFetchingSelector(state)).toEqual(isFetching);
  });

  it('should handle selectedIdSelector', () => {
    const selectedId = '1';
    const state: RootState = {
      [featureKey]: {
        ...initialState,
        selectedId,
      },
    };

    expect(selectedIdSelector(state)).toEqual(selectedId);
  });

  it('should handle todoSelector', () => {
    const todos = generateTodosMock();
    const state1: RootState = {
      [featureKey]: adapter.setAll({ ...initialState, selectedId: '1' }, todos),
    };
    const state2: RootState = {
      [featureKey]: adapter.setAll(
        { ...initialState, selectedId: '999' },
        todos
      ),
    };
    const state3: RootState = {
      [featureKey]: adapter.setAll({ ...initialState }, todos),
    };

    expect(todoSelector(state1)).toEqual(todos[0]);
    expect(todoSelector(state2)).toEqual(null);
    expect(todoSelector(state3)).toEqual(null);
  });
});
