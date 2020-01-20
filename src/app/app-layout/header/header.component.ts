import { Component, OnInit, Inject } from '@angular/core';
import { AuthorizationService } from '@app/app-services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@app/app-models';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';

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
    private authService: AuthorizationService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    @Inject('SUPPORTED_LANGUAGES') readonly supportedLanguages: string[],
  ) {
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

  onChangeLanguage(lang: MatSelectChange) {
    this.translate.use(lang.value);
  }
}
