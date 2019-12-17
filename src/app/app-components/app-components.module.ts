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

@NgModule({
  declarations: [BreadcrumbsNavbarComponent, CoursesItemComponent, CoursesListComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AppDirectivesModule,
    AppPipesModule,
    AppServicesModule,
    FormsModule,
  ],
  exports: [BreadcrumbsNavbarComponent, CoursesListComponent, CoursesItemComponent, LoginPageComponent],
})
export class AppComponentsModule { }
