import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 courses listed', () => {
    const compiled = fixture.debugElement.nativeElement;
    const coursesList = Array.from(compiled.querySelectorAll('app-courses-item'));
    expect(coursesList).toBeDefined();
    expect(coursesList.length).toEqual(3);
  });

  it(`should have a 'LOAD MORE' section`, () => {
    const compiled = fixture.debugElement.nativeElement;
    const loadMore = compiled.querySelector('.rectangle > span');
    expect(loadMore).toBeDefined();
    expect(loadMore.textContent).toEqual('LOAD MORE');
  });
});
