import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/app-models/course';

/** Displays all the existing courses. */
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  private readonly FAKE_COURSE_1 = {
    id: 'id_1',
    title: 'Course 1',
    creationDate: new Date(100000000),
    duration: 10,
    description: 'Course 1 description...',
  };
  private readonly FAKE_COURSE_2 = {
    id: 'id_2',
    title: 'Course 2',
    creationDate: new Date(200000000),
    duration: 20,
    description: 'Course 2 description...',
  };
  private readonly FAKE_COURSE_3 = {
    id: 'id_3',
    title: 'Course 3',
    creationDate: new Date(300000000),
    duration: 30,
    description: 'Course 3 description...',
  };
  readonly courses: Course[] = [this.FAKE_COURSE_1, this.FAKE_COURSE_2, this.FAKE_COURSE_3];
  constructor() { }

  ngOnInit() {
  }

}
