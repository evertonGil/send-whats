import { createSelector } from '@ngrx/store';
import { ClientStoreType } from '../models/ClientType';

 
export interface AppState {
  client: ClientStoreType;
}
 
export const selectFeature = (state: AppState) => state.client;
 
export const selectUser = createSelector(
  selectFeature,
  (state: ClientStoreType) => state.user
);

export const selectClient = createSelector(
  selectFeature,
  (state: ClientStoreType) => state
);

export const selectToken = createSelector(
  selectFeature,
  (state: ClientStoreType) => state.user.token
);