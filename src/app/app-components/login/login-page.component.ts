import { Component, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '@app/app-services';
import { Router } from '@angular/router';

/** Login form. */
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

    email: string;
    password: string;
    @Output() loggedIn = new EventEmitter<void>();

    constructor(private readonly authService: AuthorizationService, private readonly router: Router) { }

    onLogin() {
        this.authService.login();
        this.loggedIn.emit();
        this.router.navigate(['/courses']);
    }
}
