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
    const courseCreationTimestamp = new Date(this.courseCreationDate).getTime();
    const isFresh = courseCreationTimestamp < todayTimestamp && courseCreationTimestamp >= prev14daysTimestamp;
    const toBeReleased = courseCreationTimestamp > todayTimestamp;

    if (isFresh) {
      borderClass = 'fresh';
    } else if (toBeReleased) {
      borderClass = 'to-be-released';
    }

    this.renderer.addClass(this.element.nativeElement, borderClass);
  }
}
