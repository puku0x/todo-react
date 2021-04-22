import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { TodoCreatePage } from './todo-create';
import { TodoDetailPage } from './todo-detail';
import { TodoEditPage } from './todo-edit';
import { TodoListPage } from './todo-list';

export const TodoRoute = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact path="/todos" component={TodoListPage} />
        <Route exact path="/todos/new" component={TodoCreatePage} />
        <Route exact path="/todos/:id" component={TodoDetailPage} />
        <Route exact path="/todos/:id/edit" component={TodoEditPage} />
      </Switch>
    </Suspense>
  );
};
