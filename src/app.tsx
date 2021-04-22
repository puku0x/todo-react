import { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { TodoPage } from './pages/todo';

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/todos" component={TodoPage} />
        <Route exact path="/" render={() => <Redirect to="/todos" />} />
      </Switch>
    </Suspense>
  );
};
