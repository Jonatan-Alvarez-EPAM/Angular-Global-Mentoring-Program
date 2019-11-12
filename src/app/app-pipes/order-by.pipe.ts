import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '@app/app-models';

/** Ascending sorts a given courses list by course's creation date. */
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], ...args: string[]): Course[] {
    return courses.sort(
      (courseA, courseB) =>
        courseA.creationDate.getTime() - courseB.creationDate.getTime());
  }
}
