import { UserActions, UserActionTypes } from './user.actions';
import { User } from './user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function reducer(state: State = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.SET_USER:
    case UserActionTypes.CREATE_USER_ACCOUNT:
      return {
        ...state,
        user: { ...action.payload }
      };

    default:
      return { ...state };
  }
}

export const getUser = (state: State) => state.user;
export const getHasUser = (state: State) => !(!!state.user && !!state.user.userId && state.user.userId !== null );
