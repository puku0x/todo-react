import { lazy } from 'react';

export const TodoDetailPage = lazy(() =>
  import('./todo-detail.page').then((m) => ({ default: m.TodoDetailPage }))
);
