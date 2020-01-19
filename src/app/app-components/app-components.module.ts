import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar/breadcrumbs-navbar.component';
import { CoursesItemComponent } from './courses/courses-item/courses-item.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { AppDirectivesModule } from '../app-directives/app-directives.module';
import { AppPipesModule } from '../app-pipes/app-pipes.module';
import { AppServicesModule } from '../app-services/app-services.module';
import { LoginPageComponent } from './login/login-page.component';
import { FormsModule } from '@angular/forms';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { DateInputComponentComponent } from './date-input-component/date-input-component.component';
import { DurationInputComponentComponent } from './duration-input-component/duration-input-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponentsRoutingModule } from './app-components-routing.module';
import { BlockingOverlayComponent } from './blocking-overlay/blocking-overlay.component';

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
  ],
  imports: [
    CommonModule,
    AppDirectivesModule,
    AppPipesModule,
    AppServicesModule,
    FormsModule,
    AppComponentsRoutingModule,
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
  ],
})
export class AppComponentsModule { }
