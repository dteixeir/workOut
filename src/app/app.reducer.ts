import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromUser from './user/user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.reducer,
  auth: fromAuth.reducer,
  user: fromUser.reducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getHasUser = createSelector(getUserState, fromUser.getHasUser);
