import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/app-models';
import { OrderByPipe, FilterByPipe } from '@app/app-pipes';
import { CoursesService } from '@app/app-services';

/** Displays all the existing courses. */
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [OrderByPipe, FilterByPipe],
})
export class CoursesListComponent implements OnInit {
  @Input() set filterTitle(filterTitle: string) {
    this.courses = new FilterByPipe().transform(this.courses, filterTitle);
  }
  courses: Course[] = [];

  constructor(private readonly coursesService: CoursesService) {
  }

  ngOnInit() {
    this.refresh();
  }

  onDeleteItem(idCourse: string) {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.delete(idCourse);
      this.refresh();
    }
  }

  onLoadMore() {
    console.log('[FAKE] Load more...');
  }

  private refresh() {
    const courses = this.coursesService.list();
    this.courses = new OrderByPipe().transform(courses);
  }
}
