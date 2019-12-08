import { Injectable } from '@angular/core';
import { todayWithoutTime, yesterdayWithoutTime, tomorrowWithoutTime } from '@app/app-utils/utils';
import { Course } from '@app/app-models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

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

  private courses: Course[] = [];

  constructor() {
    this.courses = [this.FAKE_COURSE_1, this.FAKE_COURSE_2, this.FAKE_COURSE_3];
  }

  list(): Course[] {
    return this.courses;
  }

  create(course: Course) {
    this.courses.push(course);
  }

  get(idCourse: string): Course | undefined {
    const index = this.find(idCourse);
    if (Number.isInteger(index)) {
      return this.courses[index];
    }
  }

  update(idCourse: string, courseInfo: Course) {
    const index = this.find(idCourse);
    if (Number.isInteger(index)) {
      this.courses[index] = courseInfo;
    }
  }

  delete(idCourse: string) {
    const index = this.find(idCourse);
    if (Number.isInteger(index)) {
      this.courses.splice(index, 1);
    }
  }

  private find(idCourse: string): number | undefined {
    const index = this.courses.findIndex((course: Course) => course.id === idCourse);
    return index >= 0 ? index : undefined;
  }
}
