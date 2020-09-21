import { lazy } from 'react';

export const TodoPage = lazy(() =>
  import('./todo.route').then((m) => ({ default: m.TodoRoute }))
);
