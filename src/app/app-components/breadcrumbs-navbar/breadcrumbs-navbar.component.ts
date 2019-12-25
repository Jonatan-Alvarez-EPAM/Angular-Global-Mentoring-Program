import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';

/** Displays the current section the user is in. */
@Component({
  selector: 'app-breadcrumbs-navbar',
  templateUrl: './breadcrumbs-navbar.component.html',
  styleUrls: ['./breadcrumbs-navbar.component.scss']
})
export class BreadcrumbsNavbarComponent implements OnInit {

  courseId?: string;
  courseTitle?: string;
  constructor(private readonly route: ActivatedRoute, private readonly coursesService: CoursesService) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      const course = this.coursesService.get(this.courseId);
      this.courseTitle = course.title;
    }
  }

}
