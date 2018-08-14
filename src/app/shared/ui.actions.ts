import { Action } from '@ngrx/store';

export enum UiActionTypes {
  START_LOADING = '[UI]_START_LOADING',
  STOP_LOADING = '[UI]_STOP_LOADING',
}

export class StartLoading implements Action {
  readonly type = UiActionTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = UiActionTypes.STOP_LOADING;
}

export type UiActions = StartLoading | StopLoading;
