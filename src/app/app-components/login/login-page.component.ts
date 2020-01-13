import { Component, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '@app/app-services';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { computeControlValidity } from '@app/app-utils';

/** Login form. */
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
    readonly computeControlValidity = computeControlValidity;
    readonly emailControl = new FormControl({ value: null, disabled: false }, Validators.required);
    readonly passwordControl = new FormControl({ value: null, disabled: false }, Validators.required);
    readonly formGroup = new FormGroup({
        email: this.emailControl,
        password: this.passwordControl,
    });
    @Output() loggedIn = new EventEmitter<void>();

    constructor(
        private readonly authService: AuthorizationService,
        private readonly router: Router
    ) { }

    onLogin() {
        this.authService.login(this.emailControl.value, this.passwordControl.value);
        this.loggedIn.emit();
        this.router.navigate(['/courses']);
    }
}
