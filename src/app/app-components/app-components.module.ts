import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar/breadcrumbs-navbar.component';
import { CoursesItemComponent } from './courses/courses-item/courses-item.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';



@NgModule({
  declarations: [BreadcrumbsNavbarComponent, CoursesItemComponent, CoursesListComponent],
  imports: [
    CommonModule
  ],
  exports: [BreadcrumbsNavbarComponent, CoursesListComponent, CoursesItemComponent],
})
export class AppComponentsModule { }
