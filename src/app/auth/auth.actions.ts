import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTHENTICATED = '[AUTH]_SET_AUTHENTICATED',
  SET_UNAUTHENTICATED = '[AUTH]_SET_UNAUTHENTICATED',
  REGISTER = '[AUTH]_REGISTER',
}

export class SetAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
}

export type AuthActions = SetAuthenticated
  | SetUnAuthenticated
  | Register;
