import { EventEmitter, Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '@app/app-models';
import { Router } from '@angular/router';

/** Displays all the datailed info for a given course. */
@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesItemComponent implements OnInit {

  @Input() courseInfo: Course;
  @Output() deleteCourse = new EventEmitter<string>();

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  onEdit(event: Event) {
    this.router.navigate(['courses', this.courseInfo.id]);
  }

  onDelete(event: Event) {
    this.deleteCourse.emit(this.courseInfo.id);
  }
}
