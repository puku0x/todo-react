import { lazy } from 'react';

export const TodoCreatePage = lazy(() =>
  import('./todo-create.page').then((m) => ({ default: m.TodoCreatePage }))
);
