import { createSelector } from '@reduxjs/toolkit';

import { TodoState, adapter, featureKey } from '../states';

interface State {
  [featureKey]: TodoState;
}

const featureStateSelector = (state: State) => state[featureKey];

export const {
  selectAll: todosSelector,
  selectEntities: entitiesSelector,
} = adapter.getSelectors(featureStateSelector);

export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state) => state.isFetching
);

export const selectedIdSelector = createSelector(
  featureStateSelector,
  (state) => state.selectedId
);

export const todoSelector = createSelector(
  entitiesSelector,
  selectedIdSelector,
  (entities, id) => (id ? entities[id] || null : null)
);
