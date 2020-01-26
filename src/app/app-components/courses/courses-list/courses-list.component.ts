import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/app-models';
import { OrderByPipe, FilterByPipe } from '@app/app-pipes';
import { Observable, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import { getCoursesStatus } from '@app/store/selectors/courses.selectors';
import * as CoursesActions from '@app/store/actions/courses.actions';

/** Displays all the existing courses. */
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [OrderByPipe, FilterByPipe],
})
export class CoursesListComponent implements OnInit {
  @Input() set filterTitle(filterTitle: string) {
    if (filterTitle) {
      this.store.dispatch(CoursesActions.listCourses({ textFragment: filterTitle }));
    }
  }
  courses$: Observable<Course[]> = this.store.select(getCoursesStatus);
  private readonly pageSize = 5;
  private pageIndex = 0;

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.loadByPage(this.getPage(), this.nextPage());
  }

  onDeleteItem(courseId: string) {
    if (confirm('Do you really want to delete this course?')) {
      this.store.dispatch(CoursesActions.deleteCourse({ courseId }));
    }
  }

  onLoadMore() {
    this.loadByPage(this.getPage(), this.nextPage());
  }

  private loadByPage(start: string, count: string) {
    this.store.dispatch(CoursesActions.listCourses({ start, count }));
  }

  private getPage(): string {
    return (this.pageSize * this.pageIndex++).toString();
  }

  private nextPage(): string {
    return (this.pageSize).toString();
  }
}
