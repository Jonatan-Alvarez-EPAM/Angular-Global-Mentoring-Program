import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { OverlayService } from '@app/app-services/overlay.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly overlayService: OverlayService,
        private readonly authService: AuthorizationService,
        @Inject('Storage') private readonly localStorage: Storage
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.overlayService.showOverlay$.next(true);
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', this.localStorage.getItem(this.authService.TOKEN))
        });
        // Delay response 1s to allow loading-overlay to be visible enough to provide visual feedback to the user.
        const response$ = next.handle(authReq).pipe(delay(1000));
        response$.subscribe(
            {
                next: () => this.overlayService.showOverlay$.next(false),
                error: () => this.overlayService.showOverlay$.next(false),
            }
        );
        return response$;
    }
}
