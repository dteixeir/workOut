import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTHENTICATED = '[AUTH]_SET_AUTHENTICATED',
  SET_UNAUTHENTICATED = '[AUTH]_SET_UNAUTHENTICATED'
}

export class SetAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated
  | SetUnAuthenticated;
