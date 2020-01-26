import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@app/app-models';
import { select, Store } from '@ngrx/store';
import { AppState } from '@app/store';
import * as CoursesActions from '@app/store/actions/courses.actions';
import { getCurrentCourseStatus } from '@app/store/selectors/courses.selectors';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

/** Displays the current section the user is in. */
@Component({
  selector: 'app-breadcrumbs-navbar',
  templateUrl: './breadcrumbs-navbar.component.html',
  styleUrls: ['./breadcrumbs-navbar.component.scss']
})
export class BreadcrumbsNavbarComponent implements OnInit {

  courseId?: string;
  courseName$: Observable<string> = this.store
    .pipe(
      select(getCurrentCourseStatus),
      filter(Boolean),
      map((course: Course) => course.name));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.store.dispatch(CoursesActions.getCourse({ courseId: this.courseId }));
    }
  }
}
