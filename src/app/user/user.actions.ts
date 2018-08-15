import { Action } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionTypes {
  SET_USER = '[USER]_SET_USER',
  CREATE_USER_ACCOUNT = '[USER]_CREATE_USER_ACCOUNT'
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SET_USER;

  constructor(public payload: User) { }
}

export class CreateUserAccount implements Action {
  readonly type = UserActionTypes.CREATE_USER_ACCOUNT;

  constructor(public payload: User) { }
}

export type UserActions = SetUser
  | CreateUserAccount;
