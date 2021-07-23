import { configureStore } from '@reduxjs/toolkit';

import {
  generateTodoMock,
  generateTodosMock,
  generateTodoCreateDtoMock,
  generateTodoUpdateDtoMock,
} from '../../../models/testing';
import { todoService } from '../../../services';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from './todo.action';

describe('actions', () => {
  it(`should create ${fetchAllTodos.fulfilled.type}`, async () => {
    const todos = generateTodosMock();
    const spy = jest.spyOn(todoService, 'fetchAll').mockResolvedValue(todos);
    const store = configureStore({ reducer: jest.fn() });
    const offset = 0;
    const limit = 10;
    const { payload } = await store.dispatch(fetchAllTodos({ offset, limit }));

    expect(spy).toHaveBeenCalledWith(offset, limit);
    expect(payload).toEqual({ todos });
  });

  it(`should create ${fetchTodo.fulfilled.type}`, async () => {
    const todo = generateTodoMock();
    const spy = jest.spyOn(todoService, 'fetch').mockResolvedValue(todo);
    const store = configureStore({ reducer: jest.fn() });
    const id = '1';
    const { payload } = await store.dispatch(fetchTodo({ id }));

    expect(spy).toHaveBeenCalledWith(id);
    expect(payload).toEqual({ todo });
  });

  it(`should create ${createTodo.fulfilled.type}`, async () => {
    const todo = generateTodoMock();
    const spy = jest.spyOn(todoService, 'create').mockResolvedValue(todo);
    const store = configureStore({ reducer: jest.fn() });
    const dto = generateTodoCreateDtoMock();
    const { payload } = await store.dispatch(createTodo({ todo: dto }));

    expect(spy).toHaveBeenCalledWith(dto);
    expect(payload).toEqual({ todo });
  });

  it(`should create ${updateTodo.fulfilled.type}`, async () => {
    const todo = generateTodoMock();
    const spy = jest.spyOn(todoService, 'update').mockResolvedValue(todo);
    const store = configureStore({ reducer: jest.fn() });
    const id = '1';
    const dto = generateTodoUpdateDtoMock();
    const { payload } = await store.dispatch(updateTodo({ id, todo: dto }));

    expect(spy).toHaveBeenCalledWith(id, dto);
    expect(payload).toEqual({ todo });
  });

  it(`should create ${removeTodo.fulfilled.type}`, async () => {
    const id = '1';
    const spy = jest.spyOn(todoService, 'remove').mockResolvedValue(id);
    const store = configureStore({ reducer: jest.fn() });
    const { payload } = await store.dispatch(removeTodo({ id }));

    expect(spy).toHaveBeenCalledWith(id);
    expect(payload).toEqual({ id });
  });
});
