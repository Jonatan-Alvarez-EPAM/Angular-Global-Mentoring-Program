import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;
    component.courseInfo = {
        id: 'FAKE ID',
        title: 'FAKE TITLE',
        creationDate: new Date(1),
        duration: 10,
        description: 'FAKE DESCRIPTION',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the edit button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const editButton = compiled.querySelector('.edit-button');
    expect(editButton).toBeDefined();
  });

  it('should have the delete button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const deleteButton = compiled.querySelector('.delete-button');
    expect(deleteButton).toBeDefined();
  });
});
