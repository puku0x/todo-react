import { Todo } from '../../../models';
import { State, initialState, adapter } from '../states';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from '../actions';
import { reducer } from './todo.reducer';
import {
  generateTodoCreateDtoMock,
  generateTodoMock,
  generateTodosMock,
  generateTodoUpdateDtoMock,
} from '../../../models/testing';

describe('reducers', () => {
  it('should handle unknown action', () => {
    const action = {
      type: '',
    };

    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it(`should handle ${fetchAllTodos.pending.type}`, () => {
    const state: State = {
      ...initialState,
    };
    const action = fetchAllTodos.pending('', { offset: 0, limit: 10 });
    const expectedState: State = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchAllTodos.fulfilled.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = fetchAllTodos.fulfilled({ todos: generateTodosMock() }, '', {
      offset: 0,
      limit: 10,
    });
    const { todos } = action.payload;
    const expectedState: State = adapter.setAll(
      {
        ...state,
        isFetching: false,
      },
      todos
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchAllTodos.rejected.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = fetchAllTodos.rejected(new Error(), '', {
      offset: 0,
      limit: 10,
    });
    const expectedState: State = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.pending.type}`, () => {
    const state: State = {
      ...initialState,
    };
    const action = fetchTodo.pending('', { id: '1' });
    const expectedState: State = {
      ...state,
      isFetching: true,
      selectedId: '1',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.fulfilled.type}`, () => {
    const todos = generateTodosMock();
    const state: State = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
        selectedId: '1',
      },
      todos
    );
    const action = fetchTodo.fulfilled({ todo: generateTodoMock() }, '', {
      id: '1',
    });
    const { todo } = action.payload;
    const expectedState: State = adapter.upsertOne(
      {
        ...state,
        isFetching: false,
      },
      todo
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.rejected.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = fetchTodo.rejected(new Error(), '', { id: '1' });
    const expectedState: State = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.pending.type}`, () => {
    const state: State = {
      ...initialState,
    };
    const action = createTodo.pending('', {
      todo: generateTodoCreateDtoMock(),
    });
    const expectedState: State = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.fulfilled.type}`, () => {
    const entries: Todo[] = [];
    const state: State = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      entries
    );
    const action = createTodo.fulfilled({ todo: generateTodoMock() }, '', {
      todo: generateTodoCreateDtoMock(),
    });
    const { todo } = action.payload;
    const expectedState: State = adapter.addOne(
      {
        ...state,
        isFetching: false,
      },
      todo
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.rejected.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = createTodo.rejected(new Error(), '', {
      todo: generateTodoCreateDtoMock(),
    });
    const expectedState: State = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${updateTodo.pending.type}`, () => {
    const state: State = {
      ...initialState,
    };
    const action = updateTodo.pending('', {
      id: '1',
      todo: generateTodoUpdateDtoMock(),
    });
    const expectedState: State = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${updateTodo.fulfilled.type}`, () => {
    const todos = generateTodosMock();
    const state: State = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      todos
    );
    const action = updateTodo.fulfilled({ todo: generateTodoMock() }, '', {
      id: '1',
      todo: generateTodoUpdateDtoMock(),
    });
    const { todo } = action.payload;
    const expectedState: State = adapter.updateOne(
      {
        ...state,
        isFetching: false,
      },
      {
        id: todo.id,
        changes: todo,
      }
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${updateTodo.rejected.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = updateTodo.rejected(new Error(), '', {
      id: '1',
      todo: generateTodoUpdateDtoMock(),
    });
    const expectedState: State = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.pending.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: false,
    };
    const action = removeTodo.pending('', { id: '1' });
    const expectedState: State = {
      ...state,
      isFetching: true,
      selectedId: '1',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.fulfilled.type}`, () => {
    const todos = generateTodosMock();
    const state: State = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      todos
    );
    const action = removeTodo.fulfilled({ id: '1' }, '', { id: '1' });
    const { id } = action.payload;
    const expectedState: State = adapter.removeOne(
      {
        ...state,
        isFetching: false,
      },
      id
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.rejected.type}`, () => {
    const state: State = {
      ...initialState,
      isFetching: true,
    };
    const action = removeTodo.rejected(new Error(), '', { id: '1' });
    const expectedState: State = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
