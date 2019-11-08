import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo image', () => {
    const compiled = fixture.debugElement.nativeElement;
    const logoImage = compiled.querySelector('.logo');
    expect(logoImage).toBeDefined();
  });

  it('should have the user login button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const loginImage = compiled.querySelector('.ic_user');
    const loginText = compiled.querySelector('.user-login');
    expect(loginImage).toBeDefined();
    expect(loginText).toBeDefined();
    expect(loginText.textContent).toEqual('User login');
  });

  it('should have the user logoff button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const logOffImage = compiled.querySelector('.ic_exit');
    const logOffText = compiled.querySelector('.log-off');
    expect(logOffImage).toBeDefined();
    expect(logOffText).toBeDefined();
    expect(logOffText.textContent).toEqual('Log off');
  });
});
