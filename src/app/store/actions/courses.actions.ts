import { createAction, props } from '@ngrx/store';
import { Course } from '@app/app-models';

export enum CoursesActionTypes {
    GetCourse = '[Courses API] Get course',
    GetCourseSuccess = '[Courses API] Get course success',
    GetCourseError = '[Courses API] Get course error',

    ListCourses = '[Courses API] List courses',
    ListCoursesSuccess = '[Courses API] List courses success',
    ListCoursesError = '[Courses API] List courses error',

    AddCourse = '[Courses API] Add course',
    AddCourseSuccess = '[Courses API] Add course success',
    AddCourseError = '[Courses API] Add course error',

    EditCourse = '[Courses API] Edit course',
    EditCourseSuccess = '[Courses API] Edit course success',
    EditCourseError = '[Courses API] Edit course error',

    DeleteCourse = '[Courses API] Delete course',
    DeleteCourseSuccess = '[Courses API] Delete courses success',
    DeleteCourseError = '[Courses API] Delete course error',
}

// Get course actions.
export const getCourse = createAction(
    CoursesActionTypes.GetCourse, props<{ courseId: string }>()
);
export const getCourseSuccess = createAction(
    CoursesActionTypes.GetCourseSuccess, props<{ payload: Course }>()
);
export const getCourseError = createAction(
    CoursesActionTypes.GetCourseError
);

// List courses actions.
export const listCourses = createAction(
    CoursesActionTypes.ListCourses, props<{ start?: string, count?: string, textFragment?: string }>()
);
export const listCoursesSuccess = createAction(
    CoursesActionTypes.ListCoursesSuccess, props<{ payload: Course[] }>()
);
export const listCoursesError = createAction(
    CoursesActionTypes.ListCoursesError
);

// Add course actions.
export const addCourse = createAction(
    CoursesActionTypes.AddCourse, props<{ courseInfo: Course }>()
);
export const addCourseSuccess = createAction(
    CoursesActionTypes.AddCourseSuccess, props<{ payload: Course[] }>()
);
export const addCourseError = createAction(
    CoursesActionTypes.AddCourseError
);

// Edit course actions.
export const editCourse = createAction(
    CoursesActionTypes.EditCourse, props<{ courseInfo: Course }>()
);
export const editCourseSuccess = createAction(
    CoursesActionTypes.EditCourseSuccess, props<{ payload: Course[] }>()
);
export const editCourseError = createAction(
    CoursesActionTypes.EditCourseError
);

// Delete course actions.
export const deleteCourse = createAction(
    CoursesActionTypes.DeleteCourse, props<{ courseId: string }>()
);
export const deleteCourseSuccess = createAction(
    CoursesActionTypes.DeleteCourseSuccess, props<{ payload: Course[] }>()
);
export const deleteCourseError = createAction(
    CoursesActionTypes.DeleteCourseError
);
