import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '@app/app-models';

/** Filters out courses whose title matches the given string. */
@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(courses: Course[], ...args: string[]): Course[] {
    const searchTerm = args[0] as string;
    return courses.filter((course: Course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
