import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingOverlayComponent } from './blocking-overlay.component';

describe('BlockingOverlayComponent', () => {
  let component: BlockingOverlayComponent;
  let fixture: ComponentFixture<BlockingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockingOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
