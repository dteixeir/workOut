import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function uiReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.SET_AUTHENTICATED:
      return { isAuthenticated: true };

    case AuthActionTypes.SET_UNAUTHENTICATED:
      return { isAuthenticated: false };

    // case AuthActionTypes.REGISTER:
    //   return {
    //     isAuthenticated: false
    //   };

    default:
      return { ...state };
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
