import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@app/app-models';
import { todayWithoutTime, yesterdayWithoutTime, tomorrowWithoutTime } from '@app/app-utils/utils';
import { OrderByPipe, FilterByPipe } from '@app/app-pipes';

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

  private readonly LOREM_IPSUM = `Lorem ipsum dolor sit amet, 
  consectetur adipiscing elit, sed do eiusmod tempor incididunt 
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
  id est laborum`;

  private readonly FAKE_COURSE_1 = {
    id: 'id_1',
    title: 'Course 1',
    creationDate: yesterdayWithoutTime(),
    duration: 90,
    description: `Course 1 description...${this.LOREM_IPSUM}`,
    topRated: false,
  };
  private readonly FAKE_COURSE_2 = {
    id: 'id_2',
    title: 'Course 2',
    creationDate: tomorrowWithoutTime(),
    duration: 60,
    description: `Course 2 description...${this.LOREM_IPSUM}`,
    topRated: false,
  };
  private readonly FAKE_COURSE_3 = {
    id: 'id_3',
    title: 'Course 3',
    creationDate: todayWithoutTime(),
    duration: 30,
    description: `Course 3 description...${this.LOREM_IPSUM}`,
    topRated: true,
  };
  courses: Course[] = [];

  constructor() { }

  ngOnInit() {
    const courses = [this.FAKE_COURSE_1, this.FAKE_COURSE_2, this.FAKE_COURSE_3];
    this.courses = new OrderByPipe().transform(courses);
  }

  onDeleteItem(idCourse: Event) {
    console.log('[FAKE] deleting course with id:', idCourse);
  }

  onLoadMore() {
    console.log('[FAKE] Load more...');
  }

}
