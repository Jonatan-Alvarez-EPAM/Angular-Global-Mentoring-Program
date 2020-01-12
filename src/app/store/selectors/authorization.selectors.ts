import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromAuthorization from '@app/store/reducers/authorization.reducer';

export const getAuthorizationState =
    createFeatureSelector<fromAuthorization.AuthorizationState>(fromAuthorization.authorizationFeatureKey);

export const getAccessStatus =
    createSelector(getAuthorizationState, (state: fromAuthorization.AuthorizationState) => state.canAccess);

export const getUserStatus =
    createSelector(getAuthorizationState, (state: fromAuthorization.AuthorizationState) => state.userInfo);
