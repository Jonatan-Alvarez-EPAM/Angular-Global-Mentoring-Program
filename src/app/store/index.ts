import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuthorization from './reducers/authorization.reducer';
import * as fromCourses from './reducers/courses.reducer';


export interface AppState {
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.AuthorizationState;
  [fromCourses.coursesFeatureKey]: fromCourses.CoursesState;
}

export const reducers: ActionReducerMap<AppState> = {
  // [fromAuthorization.authorizationFeatureKey]: fromAuthorization.reducer,
  authorization: fromAuthorization.reducer,

  // [fromCourses.coursesFeatureKey]: fromCourses.reducer,
  courses: fromCourses.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
