import { createSelector } from '@reduxjs/toolkit';

import { TodoState, adapter, featureKey } from '../states';

const { selectAll, selectEntities } = adapter.getSelectors();

const featureStateSelector = (state: { [featureKey]: TodoState }) =>
  state[featureKey];

const entitiesSelector = createSelector(
  featureStateSelector,
  selectEntities
);

export const isFetchingSelector = createSelector(
  featureStateSelector,
  state => state.isFetching
);

export const selectedIdSelector = createSelector(
  featureStateSelector,
  state => state.selectedId
);

export const todosSelector = createSelector(
  featureStateSelector,
  selectAll
);

export const todoSelector = createSelector(
  entitiesSelector,
  selectedIdSelector,
  (entities, id) => (id ? entities[id] || null : null)
);
