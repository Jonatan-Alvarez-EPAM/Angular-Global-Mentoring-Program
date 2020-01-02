import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@app/app-services';
import { Router } from '@angular/router';

/** App-wide header. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserAuthenticated = false;

  constructor(
    private authService: AuthorizationService, private readonly router: Router) {
    this.isUserAuthenticated = authService.isAuthenticated();
  }

  ngOnInit() {
  }

  onLogIn() {
    this.authService.login();
    this.isUserAuthenticated = true;
    console.log('[FAKE] logged in successfully...');
  }

  onLogOff() {
    this.authService.logout();
    this.isUserAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
