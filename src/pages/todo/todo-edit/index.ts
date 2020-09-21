import { lazy } from 'react';

export const TodoEditPage = lazy(() =>
  import('./todo-edit.page').then((m) => ({ default: m.TodoEditPage }))
);
