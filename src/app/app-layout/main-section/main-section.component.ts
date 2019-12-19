import { Component, OnInit } from '@angular/core';
import { AuthorizationService, CoursesService } from '@app/app-services';
import { Course } from '@app/app-models';

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

  constructor(authService: AuthorizationService, private readonly courseService: CoursesService) {
    this.isUserAuthenticated = authService.isAuthenticated();
  }

  ngOnInit() {
  }

  onSearch(event: string) {
    console.log('Searching for:', event);
    this.titleToSearch = `${event}`;
  }

  onLogIn() {
    this.isUserAuthenticated = true;
  }

  onAddCourse() {
    this.showAddCoursePage = true;
  }

  onCancel() {
    this.showAddCoursePage = false;
  }

  onSave(course: Course) {
    this.courseService.create(course);
    this.showAddCoursePage = false;
  }

}
