import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly authService: AuthorizationService,
        @Inject('Storage') private readonly localStorage: Storage
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', this.localStorage.getItem(this.authService.TOKEN))
        });
        return next.handle(authReq);
    }
}
