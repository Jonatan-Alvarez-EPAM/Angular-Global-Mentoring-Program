import { Component, Inject } from '@angular/core';
import { OverlayService } from '@app/app-services/overlay.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/** Main app component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Mentoring Program 2019';
  displayOverlay$: Observable<boolean>;

  constructor(
    readonly overlayService: OverlayService,
    readonly translate: TranslateService,
    @Inject('SUPPORTED_LANGUAGES') private readonly supportedLanguages: string[],
  ) {
    this.displayOverlay$ = overlayService.showOverlay$.asObservable().pipe(distinctUntilChanged());

    const defaultLanguage = supportedLanguages[0];
    translate.addLangs(supportedLanguages);
    translate.setDefaultLang(defaultLanguage);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : defaultLanguage);
  }
}
