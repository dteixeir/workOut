import { Action } from '@ngrx/store';
import { Excersize } from './excersize.model';

export enum TrainingActionTypes {
  SET_AVAILABLE_TRAININGS = '[TRAINING]_SET_AVAILABLE_TRAININGS',
  SET_FINISHED_TRAININGS = '[TRAINING]_SET_FINISHED_TRAININGS',
  START_TRAINING = '[TRAINING]_START_TRAINING',
  STOP_TRAINING = '[TRAINING]_STOP_TRAINING'
}

export class SetAvailableTraining implements Action {
  readonly type = TrainingActionTypes.SET_AVAILABLE_TRAININGS;

  constructor(public payload: Excersize[]) {}
}

export class SetFinishedTraining implements Action {
  readonly type = TrainingActionTypes.SET_FINISHED_TRAININGS;

  constructor(public payload: Excersize[]) {}
}

export class StartTraining implements Action {
  readonly type = TrainingActionTypes.START_TRAINING;

  constructor(public payload: Excersize) {}
}

export class StopTraining implements Action {
  readonly type = TrainingActionTypes.STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining
  | SetFinishedTraining
  | StartTraining
  | StopTraining;
