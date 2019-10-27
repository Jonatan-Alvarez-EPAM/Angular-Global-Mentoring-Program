import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/app-models/course';

/** Displays all the datailed info for a given course. */
@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent implements OnInit {

  @Input() courseInfo: Course;

  constructor() { }

  ngOnInit() {
  }

}
