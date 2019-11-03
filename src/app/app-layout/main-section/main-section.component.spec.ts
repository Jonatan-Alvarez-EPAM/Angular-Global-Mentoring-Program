import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionComponent } from './main-section.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('MainSectionComponent', () => {
  let component: MainSectionComponent;
  let fixture: ComponentFixture<MainSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSectionComponent ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the breadscrumbs navigation bar', () => {
    const compiled = fixture.debugElement.nativeElement;
    const breadscrumbsNavbar = compiled.querySelector('app-breadcrumbs-navbar');
    expect(breadscrumbsNavbar).toBeDefined();
  });

  it('should have a search term input', () => {
    const compiled = fixture.debugElement.nativeElement;
    const searchTermInput = compiled.querySelector('input');
    expect(searchTermInput).toBeDefined();
  });

  it('should have a search button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const searchButton = compiled.querySelector('.search-button');
    expect(searchButton).toBeDefined();
  });

  it('should have an add course button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const addCourseButton = compiled.querySelector('.add-course-button');
    expect(addCourseButton).toBeDefined();
  });

  it('should have the courses list component', () => {
    const compiled = fixture.debugElement.nativeElement;
    const coursesList = compiled.querySelector('app-courses-list');
    expect(coursesList).toBeDefined();
  });
});
