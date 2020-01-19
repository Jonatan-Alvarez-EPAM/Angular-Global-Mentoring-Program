import { Component, OnInit } from '@angular/core';
import { AuthorizationService, CoursesService } from '@app/app-services';
import { Course } from '@app/app-models';
import { Router } from '@angular/router';

/** Main display area. */
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  titleToSearch: string;
  isUserAuthenticated = false;
  searchTerm: string;
  showAddCoursePage = false;

  constructor(authService: AuthorizationService, private readonly courseService: CoursesService, private readonly router: Router) {
  }

  ngOnInit() {
  }

  onSearch(event: string) {
    this.titleToSearch = `${event}`;
  }

  onAddCourse() {
    this.router.navigate(['/courses/new']);
  }
}
