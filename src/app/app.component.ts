import { Component } from '@angular/core';
import { OverlayService } from '@app/app-services/overlay.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/** Main app component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Mentoring Program 2019';
  displayOverlay$: Observable<boolean>;

  constructor(private readonly overlayService: OverlayService) {
    this.displayOverlay$ = overlayService.showOverlay$.asObservable().pipe(distinctUntilChanged());
  }
}
