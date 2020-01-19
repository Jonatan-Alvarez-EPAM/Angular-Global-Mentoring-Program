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
  userInfo?: User;
  readonly isUserAuthenticated$: Observable<boolean>;
  readonly userInfo$: Observable<User>;

  constructor(
    private authService: AuthorizationService, private readonly router: Router) {
    this.isUserAuthenticated$ = authService.isAuthenticated$.asObservable();
    this.userInfo$ = authService.userInfo$.asObservable();
    this.userInfo$.subscribe((userInfo: User) => this.userInfo = userInfo);
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
