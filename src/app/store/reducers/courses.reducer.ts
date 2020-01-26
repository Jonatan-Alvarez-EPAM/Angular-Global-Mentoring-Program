import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from '../actions/courses.actions';
import { Course } from '@app/app-models';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    courses: Course[];
    currentCourse: Course;
}

export const initialState: CoursesState = {
    courses: [] as Course[],
    currentCourse: null,
};

const coursesReducer = createReducer(
    initialState,

    // Get course reducers.
    on(CoursesActions.getCourse, (state: CoursesState, { courseId }) => ({
        ...state,
    })),
    on(CoursesActions.getCourseSuccess, (state: CoursesState, { payload }) => ({
        ...state, currentCourse: { ...payload }
    })),
    on(CoursesActions.getCourseError, (state: CoursesState) => ({
        ...state, currentCourse: initialState.currentCourse
    })),

    // Add courses reducers.
    on(CoursesActions.addCourse, (state: CoursesState, { courseInfo }) => ({
        ...state,
    })),
    on(CoursesActions.addCourseSuccess, (state: CoursesState, { payload }) => ({
        ...state,
    })),
    on(CoursesActions.addCourseError, (state: CoursesState) => ({
        ...state,
    })),

    // Edit course reducer.
    on(CoursesActions.editCourse, (state: CoursesState, { courseInfo }) => ({
        ...state,
    })),
    on(CoursesActions.editCourseSuccess, (state: CoursesState, { payload }) => ({
        ...state,
    })),
    on(CoursesActions.editCourseError, (state: CoursesState) => ({
        ...state,
    })),


    // List courses reducers.
    on(CoursesActions.listCourses, (state: CoursesState) => ({
        ...state,
    })),
    on(CoursesActions.listCoursesSuccess, (state: CoursesState, { payload }) => ({
        ...state, courses: [...payload]
    })),
    on(CoursesActions.listCoursesError, (state: CoursesState) => ({
        ...state, courses: initialState.courses
    })),
    // Delete course reducers.
    on(CoursesActions.deleteCourse, (state: CoursesState) => ({
        ...state,
    })),
    on(CoursesActions.deleteCourseSuccess, (state: CoursesState, { payload }) => ({
        ...state, courses: [...payload]
    })),
    on(CoursesActions.deleteCourseError, (state: CoursesState) => ({
        ...state
    }))
);

export function reducer(state: CoursesState | undefined, action: Action) {
    return coursesReducer(state, action);
}
