import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService, CoursesService } from '@app/app-services';
import { Course } from '@app/app-models';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';

/** Main display area. */
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements AfterViewInit, OnDestroy {
  titleToSearch: string;
  isUserAuthenticated = false;
  searchTerm: string;
  showAddCoursePage = false;
  private readonly onDestroy$ = new Subject();
  @ViewChild('searchInput', { static: false }) input: ElementRef;

  constructor(authService: AuthorizationService, private readonly courseService: CoursesService, private readonly router: Router) {
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
      distinctUntilChanged(),
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
      filter((text: string) => text && text.length > 2),
    ).subscribe(input => this.titleToSearch = input);
  }

  onAddCourse() {
    this.router.navigate(['/courses/new']);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
