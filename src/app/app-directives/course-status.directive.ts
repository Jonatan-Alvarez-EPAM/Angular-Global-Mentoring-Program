import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { todayWithoutTime } from '@app/app-utils/utils';

/** Styles course border depending on its creation date. */
@Directive({
  selector: '[appCourseStatus]'
})
export class CourseStatusDirective implements OnInit {
  @Input('appCourseStatus') courseCreationDate: Date;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.calculateBorderStyle();
  }

  private calculateBorderStyle() {
    let borderClass = null;
    const today = todayWithoutTime();
    const prev14days = todayWithoutTime();
    prev14days.setDate(today.getDate() - 14);

    const todayTimestamp = today.getTime();
    const prev14daysTimestamp = prev14days.getTime();
    const courseCreationTimestamp = this.courseCreationDate.getTime();

    if (courseCreationTimestamp < todayTimestamp && courseCreationTimestamp >= prev14daysTimestamp) {
      borderClass = 'fresh';
    } else if (courseCreationTimestamp > todayTimestamp) {
      borderClass = 'to-be-released';
    }

    this.renderer.addClass(this.element.nativeElement, borderClass);
  }
}
