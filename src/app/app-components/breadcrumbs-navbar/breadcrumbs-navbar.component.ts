import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';
import { Course } from '@app/app-models';
import { HttpClient } from '@angular/common/http';

/** Displays the current section the user is in. */
@Component({
  selector: 'app-breadcrumbs-navbar',
  templateUrl: './breadcrumbs-navbar.component.html',
  styleUrls: ['./breadcrumbs-navbar.component.scss']
})
export class BreadcrumbsNavbarComponent implements OnInit {

  courseId?: string;
  courseName?: string;
  constructor(private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') private readonly BASE_URL: string) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.httpClient.get<Course>(`${this.BASE_URL}/courses`, {
        params: { id: this.courseId }
      }).subscribe((response: Course) => {
        this.courseName = response.name;
      });
    }
  }
}
