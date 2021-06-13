import { createReducer } from '@reduxjs/toolkit';

import { initialState, adapter } from '../states';
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from '../actions';

export const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchAllTodos.pending, (state) => {
      return { ...state, isFetching: true };
    })
    .addCase(fetchAllTodos.fulfilled, (state, action) => {
      const { todos } = action.payload;
      return adapter.setAll({ ...state, isFetching: false }, todos);
    })
    .addCase(fetchAllTodos.rejected, (state) => {
      return { ...state, isFetching: false };
    })
    .addCase(fetchTodo.pending, (state, action) => {
      const { id } = action.meta.arg;
      return { ...state, isFetching: true, selectedId: id };
    })
    .addCase(fetchTodo.fulfilled, (state, action) => {
      const { todo } = action.payload;
      return adapter.upsertOne({ ...state, isFetching: false }, todo);
    })
    .addCase(fetchTodo.rejected, (state) => {
      return { ...state, isFetching: false };
    })
    .addCase(createTodo.pending, (state) => {
      return { ...state, isFetching: true };
    })
    .addCase(createTodo.fulfilled, (state, action) => {
      const { todo } = action.payload;
      return adapter.addOne({ ...state, isFetching: false }, todo);
    })
    .addCase(createTodo.rejected, (state) => {
      return { ...state, isFetching: false };
    })
    .addCase(updateTodo.pending, (state) => {
      return { ...state, isFetching: true };
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      const { todo } = action.payload;
      return adapter.updateOne(
        { ...state, isFetching: false },
        {
          id: todo.id,
          changes: todo,
        }
      );
    })
    .addCase(updateTodo.rejected, (state) => {
      return { ...state, isFetching: false };
    })
    .addCase(removeTodo.pending, (state, action) => {
      const { id } = action.meta.arg;
      return { ...state, isFetching: true, selectedId: id };
    })
    .addCase(removeTodo.fulfilled, (state, action) => {
      const { id } = action.payload;
      return adapter.removeOne(
        { ...state, isFetching: false, selectedId: null },
        id
      );
    })
    .addCase(removeTodo.rejected, (state) => {
      return { ...state, isFetching: false };
    })
);
