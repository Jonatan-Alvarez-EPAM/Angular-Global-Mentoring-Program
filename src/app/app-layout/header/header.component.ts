import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@app/app-services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@app/app-models';

/** App-wide header. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly isUserAuthenticated$: Observable<boolean>;
  readonly userInfo$: Observable<User>;

  constructor(
    private authService: AuthorizationService, private readonly router: Router) {
    this.isUserAuthenticated$ = authService.isAuthenticated$;
    this.userInfo$ = authService.userInfo$;
  }

  ngOnInit() {
  }

  onLogIn() {
    this.authService.login();
  }

  onLogOff() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
