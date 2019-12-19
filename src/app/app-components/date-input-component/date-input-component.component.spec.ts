import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponentComponent } from './date-input-component.component';

describe('DateInputComponentComponent', () => {
  let component: DateInputComponentComponent;
  let fixture: ComponentFixture<DateInputComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
