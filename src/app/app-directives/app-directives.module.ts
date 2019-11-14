import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseStatusDirective } from './course-status.directive';

@NgModule({
  declarations: [CourseStatusDirective],
  imports: [
    CommonModule
  ],
  exports: [CourseStatusDirective]
})
export class AppDirectivesModule { }
