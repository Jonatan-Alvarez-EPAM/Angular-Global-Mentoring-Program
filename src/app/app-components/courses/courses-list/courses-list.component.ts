import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/app-models/course';

/** Displays all the existing courses. */
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
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
    creationDate: new Date(100000000),
    duration: 10,
    description: `Course 1 description...${this.LOREM_IPSUM}`,
  };
  private readonly FAKE_COURSE_2 = {
    id: 'id_2',
    title: 'Course 2',
    creationDate: new Date(200000000),
    duration: 20,
    description: `Course 2 description...${this.LOREM_IPSUM}`,
  };
  private readonly FAKE_COURSE_3 = {
    id: 'id_3',
    title: 'Course 3',
    creationDate: new Date(300000000),
    duration: 30,
    description: `Course 3 description...${this.LOREM_IPSUM}`,
  };
  courses: Course[] = [];

  constructor() { }

  ngOnInit() {
    this.courses = [this.FAKE_COURSE_1, this.FAKE_COURSE_2, this.FAKE_COURSE_3];
  }

  onDeleteItem(idCourse: Event) {
    console.log('[FAKE] deleting course with id:', idCourse);
  }

  onLoadMore() {
    console.log('[FAKE] Load more...');
  }

}
