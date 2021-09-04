import { createSelector } from '@reduxjs/toolkit';

import { State, adapter, featureKey } from '../states';

interface RootState {
  [featureKey]: State;
}

const featureStateSelector = (state: RootState) => state[featureKey];

export const { selectAll: todosSelector, selectEntities: entitiesSelector } =
  adapter.getSelectors(featureStateSelector);

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
