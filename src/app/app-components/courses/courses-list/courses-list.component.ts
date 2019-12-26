import { Inject, Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/app-models';
import { OrderByPipe, FilterByPipe } from '@app/app-pipes';
import { HttpClient } from '@angular/common/http';
import { Observable, zip, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

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
      this.courses$ = this.httpClient.get<Course[]>(`${this.BASE_URL}/courses`, {
        params: { textFragment: filterTitle }
      });
    }
  }
  courses$: Observable<Course[]> = of();
  private readonly pageSize = 5;
  private pageIndex = 0;

  constructor(@Inject('BASE_URL') private readonly BASE_URL: string,
    private readonly httpClient: HttpClient) {
    this.courses$ = this.loadByPage(this.previousPage(), this.nextPage())
      .pipe(map((courses: Course[]) => new OrderByPipe().transform(courses)));
  }

  ngOnInit() { }

  onDeleteItem(idCourse: string) {
    if (confirm('Do you really want to delete this course?')) {
      // ToDo: Implement deleteById in BE.
      this.courses$ = this.httpClient.delete(`${this.BASE_URL}/courses`, {
        params: { id: idCourse }
      }).pipe(switchMap(() => {
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
    return this.httpClient.get<Course[]>(`${this.BASE_URL}/courses`, {
      params: { start, count }
    });
  }

  private previousPage(): string {
    return String(this.pageIndex * this.pageSize);
  }

  private nextPage(): string {
    return String(++this.pageIndex * this.pageSize - 1);
  }
}
