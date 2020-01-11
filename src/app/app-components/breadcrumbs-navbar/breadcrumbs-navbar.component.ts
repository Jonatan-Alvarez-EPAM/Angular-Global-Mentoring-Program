import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';
import { Course } from '@app/app-models';

/** Displays the current section the user is in. */
@Component({
  selector: 'app-breadcrumbs-navbar',
  templateUrl: './breadcrumbs-navbar.component.html',
  styleUrls: ['./breadcrumbs-navbar.component.scss']
})
export class BreadcrumbsNavbarComponent implements OnInit {

  courseId?: string;
  courseName?: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.coursesService.get(this.courseId)
        .subscribe((response: Course) => {
          this.courseName = response[0].name;
        });
    }
  }
}
