import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputComponentComponent } from './duration-input-component.component';

describe('DurationInputComponentComponent', () => {
  let component: DurationInputComponentComponent;
  let fixture: ComponentFixture<DurationInputComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationInputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
