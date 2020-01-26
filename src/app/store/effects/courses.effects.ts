import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '@app/app-services';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { CoursesActionTypes } from '@app/store/actions/courses.actions';
import { Course } from '@app/app-models/course';

@Injectable()
export class CoursesEffects {

    getCourse$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(CoursesActionTypes.GetCourse),
                switchMap((action: { courseId: string }) => this.coursesService.get(action.courseId)
                    .pipe(
                        map(([course]) => ({ type: CoursesActionTypes.GetCourseSuccess, payload: course })),
                        catchError(() => observableOf({ type: CoursesActionTypes.GetCourseError })),
                    ))
            )
        );

    listCourses$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(CoursesActionTypes.ListCourses),
                switchMap((action: { start?: string, count?: string, textFragment?: string }) => this.coursesService.list(action)
                    .pipe(
                        map(response => ({ type: CoursesActionTypes.ListCoursesSuccess, payload: response })),
                        catchError(() => observableOf({ type: CoursesActionTypes.ListCoursesError })),
                    ))
            )
        );

    addCourse$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(CoursesActionTypes.AddCourse),
                switchMap((action: { courseInfo: Course }) => this.coursesService.create(action.courseInfo)
                    .pipe(
                        map(response => ({ type: CoursesActionTypes.AddCourseSuccess, payload: response })),
                        catchError(() => observableOf({ type: CoursesActionTypes.AddCourseError })),
                    ))
            )
        );

    editCourse$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(CoursesActionTypes.EditCourse),
                switchMap((action: { courseInfo: Course }) => this.coursesService.update(action.courseInfo)
                    .pipe(
                        map(response => ({ type: CoursesActionTypes.EditCourseSuccess, payload: response })),
                        catchError(() => observableOf({ type: CoursesActionTypes.EditCourseError })),
                    ))
            )
        );

    deleteCourse$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(CoursesActionTypes.DeleteCourse),
                switchMap((action: { courseId: string }) => this.coursesService.delete(action.courseId)
                    .pipe(
                        map(response => ({ type: CoursesActionTypes.DeleteCourseSuccess, payload: response })),
                        catchError(() => observableOf({ type: CoursesActionTypes.DeleteCourseError })),
                    ))
            )
        );

    constructor(
        private actions$: Actions,
        private readonly coursesService: CoursesService,
    ) { }
}
