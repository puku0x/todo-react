import {
  AnyAction,
  ThunkDispatch,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import { Todo, TodoCreateDto, TodoUpdateDto } from '../../../../models';
import { todoService } from '../../../../services';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from './todo.action';

describe('actions', () => {
  const middlewares = getDefaultMiddleware({ serializableCheck: false });
  const mockStore =
    configureStore<unknown, ThunkDispatch<unknown, undefined, AnyAction>>(
      middlewares
    );

  it(`should create ${fetchAllTodos.fulfilled.type}`, async () => {
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

    jest.spyOn(todoService, 'fetchAll').mockResolvedValue(todos);

    const store = mockStore();
    await store.dispatch(fetchAllTodos({ offset: 0, limit: 10 }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchAllTodos.pending.type);
    expect(actions[1].type).toEqual(fetchAllTodos.fulfilled.type);
    expect(actions[1].payload).toEqual({ todos });
  });

  it(`should create ${fetchTodo.fulfilled.type}`, async () => {
    const id = '1';
    const todo: Todo = {
      id,
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };

    jest.spyOn(todoService, 'fetch').mockResolvedValue(todo);

    const store = mockStore();
    await store.dispatch(fetchTodo({ id }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchTodo.pending.type);
    expect(actions[1].type).toEqual(fetchTodo.fulfilled.type);
    expect(actions[1].payload).toEqual({ todo });
  });

  it(`should create ${createTodo.fulfilled.type}`, async () => {
    const todo: TodoCreateDto = {
      title: 'title',
    };
    const result: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };

    jest.spyOn(todoService, 'create').mockResolvedValue(result);

    const store = mockStore();
    await store.dispatch(createTodo({ todo }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(createTodo.pending.type);
    expect(actions[1].type).toEqual(createTodo.fulfilled.type);
    expect(actions[1].payload).toEqual({ todo: result });
  });

  it(`should create ${updateTodo.fulfilled.type}`, async () => {
    const id = '1';
    const todo: TodoUpdateDto = {
      id,
      title: 'title',
      completed: false,
    };
    const result: Todo = {
      id,
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };

    jest.spyOn(todoService, 'update').mockResolvedValue(result);

    const store = mockStore();
    await store.dispatch(updateTodo({ id, todo }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(updateTodo.pending.type);
    expect(actions[1].type).toEqual(updateTodo.fulfilled.type);
    expect(actions[1].payload).toEqual({ todo: result });
  });

  it(`should create ${removeTodo.fulfilled.type}`, async () => {
    const id = '1';

    jest.spyOn(todoService, 'remove').mockResolvedValue(id);

    const store = mockStore();
    await store.dispatch(removeTodo({ id }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(removeTodo.pending.type);
    expect(actions[1].type).toEqual(removeTodo.fulfilled.type);
    expect(actions[1].payload).toEqual({ id });
  });
});
