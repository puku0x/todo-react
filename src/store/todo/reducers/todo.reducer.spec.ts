import { Todo } from '../../../models';
import { TodoState, initialState, adapter } from '../states';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from '../actions';
import { reducer } from './todo.reducer';

describe('reducers', () => {
  it('should handle unknown action', () => {
    const action = {
      type: '',
    };

    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it(`should handle ${fetchAllTodos.pending.type}`, () => {
    const state: TodoState = {
      ...initialState,
    };
    const action: ReturnType<typeof fetchAllTodos.pending> = {
      type: fetchAllTodos.pending.type,
      payload: undefined,
      meta: {
        arg: {
          offset: 0,
          limit: 10,
        },
        requestId: '',
        requestStatus: 'pending',
      },
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchAllTodos.fulfilled.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof fetchAllTodos.fulfilled> = {
      type: fetchAllTodos.fulfilled.type,
      payload: {
        todos: [
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
        ],
      },
      meta: {
        arg: {
          offset: 0,
          limit: 10,
        },
        requestId: '',
        requestStatus: 'fulfilled',
      },
    };
    const { todos } = action.payload;
    const expectedState: TodoState = adapter.setAll(
      {
        ...state,
        isFetching: false,
      },
      todos
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchAllTodos.rejected.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof fetchAllTodos.rejected> = {
      type: fetchAllTodos.rejected.type,
      payload: undefined,
      meta: {
        aborted: false,
        arg: {
          offset: 0,
          limit: 10,
        },
        condition: false,
        rejectedWithValue: false,
        requestId: '',
        requestStatus: 'rejected',
      },
      error: new Error(),
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.pending.type}`, () => {
    const state: TodoState = {
      ...initialState,
    };
    const action: ReturnType<typeof fetchTodo.pending> = {
      type: fetchTodo.pending.type,
      payload: undefined,
      meta: {
        arg: {
          id: '1',
        },
        requestId: '',
        requestStatus: 'pending',
      },
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: true,
      selectedId: '1',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.fulfilled.type}`, () => {
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
    const state: TodoState = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
        selectedId: '1',
      },
      todos
    );
    const action: ReturnType<typeof fetchTodo.fulfilled> = {
      type: fetchTodo.fulfilled.type,
      payload: {
        todo: {
          id: '1',
          title: 'title',
          completed: false,
          createdAt: 123456789,
          updatedAt: 123456789,
        },
      },
      meta: {
        arg: {
          id: '1',
        },
        requestId: '',
        requestStatus: 'fulfilled',
      },
    };
    const { todo } = action.payload;
    const expectedState: TodoState = adapter.upsertOne(
      {
        ...state,
        isFetching: false,
      },
      todo
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${fetchTodo.rejected.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof fetchTodo.rejected> = {
      type: fetchTodo.rejected.type,
      payload: undefined,
      meta: {
        arg: {
          id: '1',
        },
        requestId: '',
        requestStatus: 'rejected',
        rejectedWithValue: false,
        aborted: false,
        condition: false,
      },
      error: new Error(),
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.pending.type}`, () => {
    const state: TodoState = {
      ...initialState,
    };
    const action: ReturnType<typeof createTodo.pending> = {
      type: createTodo.pending.type,
      payload: undefined,
      meta: {
        arg: {
          todo: {
            title: 'title',
          },
        },
        requestId: '',
        requestStatus: 'pending',
      },
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.fulfilled.type}`, () => {
    const entries: Todo[] = [];
    const state: TodoState = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      entries
    );
    const action: ReturnType<typeof createTodo.fulfilled> = {
      type: createTodo.fulfilled.type,
      payload: {
        todo: {
          id: '1',
          title: 'title',
          completed: false,
          createdAt: 123456789,
          updatedAt: 123456789,
        },
      },
      meta: {
        arg: {
          todo: {
            title: 'title',
          },
        },
        requestId: '',
        requestStatus: 'fulfilled',
      },
    };
    const { todo } = action.payload;
    const expectedState: TodoState = adapter.addOne(
      {
        ...state,
        isFetching: false,
      },
      todo
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${createTodo.rejected.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof createTodo.rejected> = {
      type: createTodo.rejected.type,
      payload: undefined,
      meta: {
        aborted: false,
        arg: {
          todo: {
            title: 'title',
          },
        },
        condition: false,
        rejectedWithValue: false,
        requestId: '',
        requestStatus: 'rejected',
      },
      error: new Error(),
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${updateTodo.pending.type}`, () => {
    const state: TodoState = {
      ...initialState,
    };
    const action: ReturnType<typeof updateTodo.pending> = {
      type: updateTodo.pending.type,
      payload: undefined,
      meta: {
        arg: {
          id: '1',
          todo: {
            id: '1',
            title: 'title',
            completed: false,
          },
        },
        requestId: '',
        requestStatus: 'pending',
      },
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: true,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${updateTodo.fulfilled.type}`, () => {
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
    const state: TodoState = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      todos
    );
    const action: ReturnType<typeof updateTodo.fulfilled> = {
      type: updateTodo.fulfilled.type,
      payload: {
        todo: {
          id: '1',
          title: 'title',
          completed: false,
          createdAt: 123456789,
          updatedAt: 123456789,
        },
      },
      meta: {
        arg: {
          id: '1',
          todo: {
            id: '1',
            title: 'title',
            completed: false,
          },
        },
        requestId: '',
        requestStatus: 'fulfilled',
      },
    };
    const { todo } = action.payload;
    const expectedState: TodoState = adapter.updateOne(
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
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof updateTodo.rejected> = {
      type: updateTodo.rejected.type,
      payload: undefined,
      meta: {
        aborted: false,
        arg: {
          id: '1',
          todo: {
            id: '1',
            title: 'title',
            completed: false,
          },
        },
        condition: false,
        rejectedWithValue: false,
        requestId: '',
        requestStatus: 'rejected',
      },
      error: new Error(),
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.pending.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: false,
    };
    const action: ReturnType<typeof removeTodo.pending> = {
      type: removeTodo.pending.type,
      payload: undefined,
      meta: {
        arg: {
          id: '1',
        },
        requestId: '',
        requestStatus: 'pending',
      },
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: true,
      selectedId: '1',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.fulfilled.type}`, () => {
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
    const state: TodoState = adapter.setAll(
      {
        ...initialState,
        isFetching: true,
      },
      todos
    );
    const action: ReturnType<typeof removeTodo.fulfilled> = {
      type: removeTodo.fulfilled.type,
      payload: {
        id: '1',
      },
      meta: {
        arg: {
          id: '1',
        },
        requestId: '',
        requestStatus: 'fulfilled',
      },
    };
    const { id } = action.payload;
    const expectedState: TodoState = adapter.removeOne(
      {
        ...state,
        isFetching: false,
      },
      id
    );

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it(`should handle ${removeTodo.rejected.type}`, () => {
    const state: TodoState = {
      ...initialState,
      isFetching: true,
    };
    const action: ReturnType<typeof removeTodo.rejected> = {
      type: removeTodo.rejected.type,
      payload: undefined,
      meta: {
        aborted: false,
        arg: {
          id: '1',
        },
        condition: false,
        rejectedWithValue: false,
        requestId: '',
        requestStatus: 'rejected',
      },
      error: new Error(),
    };
    const expectedState: TodoState = {
      ...state,
      isFetching: false,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
