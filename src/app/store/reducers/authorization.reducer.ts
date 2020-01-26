import { Action, createReducer, on } from '@ngrx/store';
import * as AuthorizationActions from '../actions/authorization.actions';
import { User } from '@app/app-models';


export const authorizationFeatureKey = 'authorization';

export interface AuthorizationState {
  canAccess: boolean;
  userInfo: User;
}

export const initialState: AuthorizationState = {
  canAccess: false,
  userInfo: null,
};

const authorizationReducer = createReducer(
  initialState,
  on(AuthorizationActions.allowAccess, (state: AuthorizationState) => ({
    ...state, canAccess: true
  })),
  on(AuthorizationActions.removeAccess, (state: AuthorizationState) => ({
    ...state, canAccess: false
  })),
  on(AuthorizationActions.updateUser, (state: AuthorizationState, { userInfo }) => ({
    ...state, userInfo
  })),
);

export function reducer(state: AuthorizationState | undefined, action: Action) {
  return authorizationReducer(state, action);
}
