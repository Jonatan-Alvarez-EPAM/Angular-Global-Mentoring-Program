import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar/breadcrumbs-navbar.component';
import { CoursesItemComponent } from './courses/courses-item/courses-item.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { AppDirectivesModule } from '../app-directives/app-directives.module';
import { AppPipesModule } from '../app-pipes/app-pipes.module';
import { AppServicesModule } from '../app-services/app-services.module';
import { LoginPageComponent } from './login/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { DateInputComponentComponent } from './date-input-component/date-input-component.component';
import { DurationInputComponentComponent } from './duration-input-component/duration-input-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponentsRoutingModule } from './app-components-routing.module';
import { BlockingOverlayComponent } from './blocking-overlay/blocking-overlay.component';
import { StoreModule } from '@ngrx/store';
import * as fromCourses from '@app/store/reducers/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from '@app/store/effects/courses.effects';
import { AuthorsInputComponent } from './authors-input-component/authors-input-component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BreadcrumbsNavbarComponent,
    CoursesItemComponent,
    CoursesListComponent,
    LoginPageComponent,
    AddCourseComponent,
    DateInputComponentComponent,
    DurationInputComponentComponent,
    PageNotFoundComponent,
    BlockingOverlayComponent,
    AuthorsInputComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AppDirectivesModule,
    AppPipesModule,
    AppServicesModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    AppComponentsRoutingModule,
    StoreModule.forFeature(fromCourses.coursesFeatureKey, fromCourses.reducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  exports: [
    BreadcrumbsNavbarComponent,
    CoursesListComponent,
    CoursesItemComponent,
    LoginPageComponent,
    AddCourseComponent,
    DateInputComponentComponent,
    DurationInputComponentComponent,
    PageNotFoundComponent,
    BlockingOverlayComponent,
    AuthorsInputComponent,
  ],
})
export class AppComponentsModule { }
