import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@app/app-services';

/** Main display area. */
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  titleToSearch: string;
  isUserAuthenticated = false;

  constructor(authService: AuthorizationService) {
    this.isUserAuthenticated = authService.isAuthenticated();
  }

  ngOnInit() {
  }

  onSearch(event: Event) {
    console.log('Searching for:', event);
    this.titleToSearch = `${event}`;
  }

  onLogIn() {
    this.isUserAuthenticated = true;
  }

}
