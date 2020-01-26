import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromCourses from '@app/store/reducers/courses.reducer';

export const getCoursesState =
    createFeatureSelector<fromCourses.CoursesState>(fromCourses.coursesFeatureKey);

export const getCoursesStatus =
    createSelector(getCoursesState, (state: fromCourses.CoursesState) => state.courses);

export const getCurrentCourseStatus =
    createSelector(getCoursesState, (state: fromCourses.CoursesState) => state.currentCourse);
