import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

/** Main display area. */
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements AfterViewInit, OnDestroy {
  titleToSearch: string;
  private readonly onDestroy$ = new Subject();
  readonly searchInputControl = new FormControl({ value: null, disabled: false }, Validators.required);

  constructor(private readonly router: Router) { }

  ngAfterViewInit() {
    this.searchInputControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
      distinctUntilChanged(),
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
