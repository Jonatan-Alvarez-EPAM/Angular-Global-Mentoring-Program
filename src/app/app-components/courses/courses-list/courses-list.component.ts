import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/app-models';
import { OrderByPipe, FilterByPipe } from '@app/app-pipes';
import { CoursesService } from '@app/app-services';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
      this.courses$ = this.coursesService.list({ textFragment: filterTitle });
    }
  }
  courses$: Observable<Course[]>;
  private readonly pageSize = 5;
  private pageIndex = 0;

  constructor(private readonly coursesService: CoursesService) {
    this.courses$ = this.loadByPage(this.previousPage(), this.nextPage())
      .pipe(map((courses: Course[]) => new OrderByPipe().transform(courses)));
  }

  ngOnInit() { }

  onDeleteItem(idCourse: string) {
    if (confirm('Do you really want to delete this course?')) {
      // ToDo: Implement deleteById in BE.
      this.courses$ =
        this.coursesService.delete(idCourse).pipe(switchMap(() => {
          this.pageIndex = 0;
          return this.loadByPage(this.previousPage(), this.nextPage())
            .pipe(map((courses: Course[]) => new OrderByPipe().transform(courses)));
        }));
    }
  }

  onLoadMore() {
    const result$ = this.loadByPage(this.previousPage(), this.nextPage());
    this.courses$ = zip(this.courses$, result$)
      .pipe(map(([a, b]) => [...a, ...b]))
      .pipe(map((courses: Course[]) => new OrderByPipe().transform(courses)));
  }

  private loadByPage(start: string, count: string): Observable<Course[]> {
    return this.coursesService.list({ start, count });
  }

  private previousPage(): string {
    return String(this.pageIndex * this.pageSize);
  }

  private nextPage(): string {
    return String(++this.pageIndex * this.pageSize - 1);
  }
}
