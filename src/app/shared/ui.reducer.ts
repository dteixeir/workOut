import { UiActions, UiActionTypes } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state: State = initialState, action: UiActions) {
  switch (action.type) {
    case UiActionTypes.START_LOADING:
      return { isLoading: true };

    case UiActionTypes.STOP_LOADING:
      return { isLoading: false };

    default:
      return { ...state };
  }
}

export const getIsLoading = (state: State) => state.isLoading;
