import { TrainingActions, TrainingActionTypes } from './training.actions';
import { Excersize } from './excersize.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExcersizes: Excersize[];
  finishedExcersizes: Excersize[];
  activeExcersize: Excersize;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExcersizes: [],
  finishedExcersizes: [],
  activeExcersize: null
};

export function trainingReducer(state: State | TrainingState = initialState, action: TrainingActions) {
  switch (action.type) {
    case TrainingActionTypes.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExcersizes: action.payload
      };

    case TrainingActionTypes.SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExcersizes: action.payload
      };

    case TrainingActionTypes.START_TRAINING:
      return {
        ...state,
        activeExcersize: { ...action.payload }
      };

    case TrainingActionTypes.STOP_TRAINING:
      return {
        ...state,
        activeExcersize: null
      };

    default:
      return {
        ...state
      };
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExcersizes = createSelector(getTrainingState, (state: TrainingState) => state.availableExcersizes);
export const getFinishedExcersizes = createSelector(getTrainingState, (state: TrainingState) => state.finishedExcersizes);
export const getActiveExcersize = createSelector(getTrainingState, (state: TrainingState) => state.activeExcersize);
export const hasActiveExcersize = createSelector(getTrainingState, (state: TrainingState) => state.activeExcersize != null);
