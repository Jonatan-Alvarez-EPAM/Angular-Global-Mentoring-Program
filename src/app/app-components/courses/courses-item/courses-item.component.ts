import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { Course } from '@app/app-models';

/** Displays all the datailed info for a given course. */
@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent implements OnInit {

  @Input() courseInfo: Course;
  @Output() deleteCourse = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(event: Event) {
    console.log('Empty handler for edit course button.');
  }

  onDelete(event: Event) {
    console.log('Empty handler for delete course button.');
    this.deleteCourse.emit(this.courseInfo.id);
  }
}
