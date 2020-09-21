import { lazy } from 'react';

export const TodoListPage = lazy(() =>
  import('./todo-list.page').then((m) => ({ default: m.TodoListPage }))
);
