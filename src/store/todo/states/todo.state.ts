import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

import { Todo } from '../../../models';

export const featureKey = 'todos';

export interface State extends EntityState<Todo> {
  isFetching: boolean;
  selectedId: string | null;
}

export const adapter = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  isFetching: false,
  selectedId: null,
});
